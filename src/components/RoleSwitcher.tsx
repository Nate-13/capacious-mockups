"use client";

import { useState } from "react";
import { useRole, RoleType } from "@/context/RoleContext";

const roles: RoleType[] = [
  "Author",
  "Managing Editor",
  "Reviewer",
  "Copy Editor",
  "Admin",
];

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded menu */}
      {isOpen && (
        <div
          className="mb-2 rounded-lg border p-3 shadow-lg"
          style={{
            backgroundColor: "white",
            borderColor: "#E0E0E0",
          }}
        >
          <div
            className="mb-2 font-medium uppercase tracking-wide"
            style={{ fontSize: "10px", color: "#666" }}
          >
            View as:
          </div>
          <div className="flex flex-col gap-1">
            {roles.map((r) => {
              const isSelected = role === r;
              return (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer text-left transition-colors hover:bg-gray-100"
                  style={{
                    fontSize: "12px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    backgroundColor: isSelected ? "#333" : "transparent",
                    color: isSelected ? "white" : "#333",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border px-3 py-2 shadow-md transition-colors hover:bg-gray-50"
        style={{
          backgroundColor: "white",
          borderColor: "#E0E0E0",
          fontSize: "12px",
        }}
      >
        <span
          className="rounded-full px-2 py-0.5"
          style={{ backgroundColor: "#333", color: "white", fontSize: "10px" }}
        >
          {role}
        </span>
        <span style={{ color: "#666" }}>{isOpen ? "×" : "▲"}</span>
      </button>
    </div>
  );
}
