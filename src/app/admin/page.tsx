"use client";

import { useState, useMemo } from "react";
import { reviewers, copyEditors } from "@/data/mockData";
import type { Reviewer, CopyEditor } from "@/types";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddReviewer, setShowAddReviewer] = useState(false);
  const [showAddCopyEditor, setShowAddCopyEditor] = useState(false);

  // New reviewer form state
  const [newReviewer, setNewReviewer] = useState({
    name: "",
    email: "",
    affiliation: "",
    expertise: "",
  });

  // New copy editor form state
  const [newCopyEditor, setNewCopyEditor] = useState({
    name: "",
    email: "",
    affiliation: "",
  });

  // Local lists (for add functionality)
  const [localReviewers, setLocalReviewers] = useState<Reviewer[]>(reviewers);
  const [localCopyEditors, setLocalCopyEditors] =
    useState<CopyEditor[]>(copyEditors);

  // Filter reviewers by search
  const filteredReviewers = useMemo(() => {
    if (!searchQuery.trim()) return localReviewers;
    const query = searchQuery.toLowerCase();
    return localReviewers.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.expertise.some((e) => e.toLowerCase().includes(query)),
    );
  }, [searchQuery, localReviewers]);

  // Filter copy editors by search
  const filteredCopyEditors = useMemo(() => {
    if (!searchQuery.trim()) return localCopyEditors;
    const query = searchQuery.toLowerCase();
    return localCopyEditors.filter(
      (ce) =>
        ce.name.toLowerCase().includes(query) ||
        ce.affiliation.toLowerCase().includes(query),
    );
  }, [searchQuery, localCopyEditors]);

  const handleAddReviewer = () => {
    if (!newReviewer.name || !newReviewer.email) return;
    const reviewer: Reviewer = {
      id: `rev-${Date.now()}`,
      name: newReviewer.name,
      email: newReviewer.email,
      affiliation: newReviewer.affiliation,
      expertise: newReviewer.expertise
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
      reviewsCompleted: 0,
      avgTurnaroundDays: 0,
    };
    setLocalReviewers((prev) => [...prev, reviewer]);
    setNewReviewer({ name: "", email: "", affiliation: "", expertise: "" });
    setShowAddReviewer(false);
  };

  const handleAddCopyEditor = () => {
    if (!newCopyEditor.name || !newCopyEditor.email) return;
    const editor: CopyEditor = {
      id: `ce-${Date.now()}`,
      name: newCopyEditor.name,
      email: newCopyEditor.email,
      affiliation: newCopyEditor.affiliation,
      expertise: [],
    };
    setLocalCopyEditors((prev) => [...prev, editor]);
    setNewCopyEditor({ name: "", email: "", affiliation: "" });
    setShowAddCopyEditor(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[32px] font-serif font-bold text-black mb-2">
            People
          </h1>
          <p className="text-[15px] text-[#666]">
            Manage reviewers and copy editors
          </p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <TextInput
            placeholder="Search by name or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Reviewers Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-serif font-bold text-black">
              Reviewer Database{" "}
              <span className="text-[15px] font-normal text-[#666]">
                ({filteredReviewers.length})
              </span>
            </h2>
            <button
              onClick={() => setShowAddReviewer(!showAddReviewer)}
              className="border border-dashed border-gray-400 text-[13px] text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              {showAddReviewer ? "Cancel" : "+ Add Reviewer"}
            </button>
          </div>

          {/* Add Reviewer Form */}
          {showAddReviewer && (
            <Card className="mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <TextInput
                  label="Name"
                  required
                  placeholder="Dr. First Last"
                  value={newReviewer.name}
                  onChange={(e) =>
                    setNewReviewer({ ...newReviewer, name: e.target.value })
                  }
                />
                <TextInput
                  label="Email"
                  required
                  placeholder="email@university.edu"
                  value={newReviewer.email}
                  onChange={(e) =>
                    setNewReviewer({ ...newReviewer, email: e.target.value })
                  }
                />
                <TextInput
                  label="Affiliation"
                  placeholder="University Name"
                  value={newReviewer.affiliation}
                  onChange={(e) =>
                    setNewReviewer({
                      ...newReviewer,
                      affiliation: e.target.value,
                    })
                  }
                />
                <TextInput
                  label="Expertise Keywords"
                  placeholder="affect theory, media, culture"
                  value={newReviewer.expertise}
                  onChange={(e) =>
                    setNewReviewer({
                      ...newReviewer,
                      expertise: e.target.value,
                    })
                  }
                />
              </div>
              <Button size="sm" onClick={handleAddReviewer}>
                Add Reviewer
              </Button>
            </Card>
          )}

          {/* Reviewer Cards */}
          <div className="space-y-3">
            {filteredReviewers.map((reviewer) => (
              <Card key={reviewer.id} hoverable>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[16px] font-semibold text-gray-800">
                      {reviewer.name}
                    </p>
                    <p className="text-[13px] text-[#666]">
                      {reviewer.email} &middot; {reviewer.affiliation}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {reviewer.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] bg-[#F5F5F5] text-[#666] px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {filteredReviewers.length === 0 && (
              <p className="text-[14px] text-[#999] py-8 text-center">
                No reviewers match your search.
              </p>
            )}
          </div>
        </section>

        {/* Copy Editors Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-serif font-bold text-black">
              Copy Editors{" "}
              <span className="text-[15px] font-normal text-[#666]">
                ({filteredCopyEditors.length})
              </span>
            </h2>
            <button
              onClick={() => setShowAddCopyEditor(!showAddCopyEditor)}
              className="border border-dashed border-gray-400 text-[13px] text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              {showAddCopyEditor ? "Cancel" : "+ Add Copy Editor"}
            </button>
          </div>

          {/* Add Copy Editor Form */}
          {showAddCopyEditor && (
            <Card className="mb-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <TextInput
                  label="Name"
                  required
                  placeholder="First Last"
                  value={newCopyEditor.name}
                  onChange={(e) =>
                    setNewCopyEditor({
                      ...newCopyEditor,
                      name: e.target.value,
                    })
                  }
                />
                <TextInput
                  label="Email"
                  required
                  placeholder="email@university.edu"
                  value={newCopyEditor.email}
                  onChange={(e) =>
                    setNewCopyEditor({
                      ...newCopyEditor,
                      email: e.target.value,
                    })
                  }
                />
                <TextInput
                  label="Affiliation"
                  placeholder="University Name"
                  value={newCopyEditor.affiliation}
                  onChange={(e) =>
                    setNewCopyEditor({
                      ...newCopyEditor,
                      affiliation: e.target.value,
                    })
                  }
                />
              </div>
              <Button size="sm" onClick={handleAddCopyEditor}>
                Add Copy Editor
              </Button>
            </Card>
          )}

          {/* Copy Editor Cards */}
          <div className="space-y-3">
            {filteredCopyEditors.map((editor) => (
              <Card key={editor.id} hoverable>
                <p className="text-[16px] font-semibold text-gray-800">
                  {editor.name}
                </p>
                <p className="text-[13px] text-[#666]">
                  {editor.email} &middot; {editor.affiliation}
                </p>
              </Card>
            ))}
            {filteredCopyEditors.length === 0 && (
              <p className="text-[14px] text-[#999] py-8 text-center">
                No copy editors match your search.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
