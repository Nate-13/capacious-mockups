"use client";

import { useState } from "react";
import { CopyEditor } from "@/types";
import { getAvailableCopyEditors } from "@/data/mockData";

interface CopyEditorAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (editorIds: string[]) => void;
  alreadyAssigned: string[];
}

export default function CopyEditorAssignmentModal({
  isOpen,
  onClose,
  onAssign,
  alreadyAssigned,
}: CopyEditorAssignmentModalProps) {
  const allEditors = getAvailableCopyEditors();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredEditors = allEditors.filter((editor) => {
    const isAlready = alreadyAssigned.includes(editor.id);
    const matchesSearch =
      search === "" ||
      editor.name.toLowerCase().includes(search.toLowerCase()) ||
      editor.affiliation.toLowerCase().includes(search.toLowerCase()) ||
      editor.expertise.some((e) =>
        e.toLowerCase().includes(search.toLowerCase()),
      );
    return !isAlready && matchesSearch;
  });

  const toggleEditor = (id: string) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-[15px] font-semibold text-gray-800">
            Assign Copy Editors
          </h2>
          <p className="text-[12px] text-gray-500 mt-1">
            Select copy editors to assign to this submission.
          </p>
        </div>

        <div className="px-5 pt-4">
          <input
            type="text"
            placeholder="Search by name, affiliation, or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {filteredEditors.length === 0 ? (
            <p className="text-[13px] text-gray-500 text-center py-4">
              No available copy editors found.
            </p>
          ) : (
            filteredEditors.map((editor) => (
              <label
                key={editor.id}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedIds.includes(editor.id)
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(editor.id)}
                  onChange={() => toggleEditor(editor.id)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <div>
                  <p className="text-[14px] font-medium text-gray-800">
                    {editor.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {editor.affiliation}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {editor.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </label>
            ))
          )}
        </div>

        <div className="p-5 border-t border-gray-100 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
