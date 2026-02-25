"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getAvailableReviewers } from "@/data/mockData";

interface ReviewerAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (reviewerIds: string[]) => void;
  alreadyAssigned: string[];
}

export default function ReviewerAssignmentModal({
  isOpen,
  onClose,
  onAssign,
  alreadyAssigned,
}: ReviewerAssignmentModalProps) {
  const allReviewers = getAvailableReviewers();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedIds([]);
      setSearch("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const filteredReviewers = allReviewers.filter((reviewer) => {
    if (alreadyAssigned.includes(reviewer.id)) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      reviewer.name.toLowerCase().includes(q) ||
      reviewer.affiliation.toLowerCase().includes(q) ||
      reviewer.expertise.some((exp) => exp.toLowerCase().includes(q))
    );
  });

  const toggleReviewer = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleAssign = () => {
    onAssign(selectedIds);
    setSelectedIds([]);
    setSearch("");
    onClose();
  };

  const modal = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zoom: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          maxHeight: "80vh",
          margin: "0 16px",
          backgroundColor: "white",
          borderRadius: 8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 20,
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#1f2937",
              margin: 0,
            }}
          >
            Assign Reviewers
          </h2>
          <p
            style={{
              fontSize: 12,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Select reviewers to assign to this submission.
          </p>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          <input
            type="text"
            placeholder="Search by name, affiliation, or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: 13,
              border: "1px solid #d1d5db",
              borderRadius: 6,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {filteredReviewers.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#6b7280",
                padding: "16px 0",
              }}
            >
              No available reviewers found.
            </p>
          ) : (
            filteredReviewers.map((reviewer) => {
              const selected = selectedIds.includes(reviewer.id);
              return (
                <label
                  key={reviewer.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: 12,
                    borderRadius: 8,
                    cursor: "pointer",
                    backgroundColor: selected ? "#f3f4f6" : "transparent",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected)
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleReviewer(reviewer.id)}
                    style={{ marginTop: 2, accentColor: "#333" }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      {reviewer.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      {reviewer.affiliation}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        marginTop: 6,
                      }}
                    >
                      {reviewer.expertise.map((exp) => (
                        <span
                          key={exp}
                          style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            backgroundColor: "#f3f4f6",
                            color: "#4b5563",
                            borderRadius: 4,
                          }}
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              );
            })
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: 20,
            borderTop: "1px solid #f3f4f6",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              fontSize: 13,
              color: "#4b5563",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedIds.length === 0}
            style={{
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 700,
              color: "white",
              backgroundColor: selectedIds.length === 0 ? "#999" : "#333",
              border: "none",
              borderRadius: 6,
              cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
              opacity: selectedIds.length === 0 ? 0.5 : 1,
            }}
          >
            Assign {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
