"use client";

import { useState, FormEvent } from "react";
import { Select, Textarea, FileUpload, Button } from "@/components/ui";

export interface ReviewFormData {
  recommendation: string;
  detailedReview: string;
  confidentialComments: string;
  annotatedFile?: File;
}

interface ReviewFormProps {
  submissionId: string;
  submissionTitle: string;
  onSubmit?: (data: ReviewFormData) => void;
  onSaveDraft?: (data: ReviewFormData) => void;
}

const recommendationOptions = [
  { value: "Accept", label: "Accept" },
  { value: "Accept with Minor Changes", label: "Accept with Minor Changes" },
  { value: "Conditional Accept", label: "Conditional Accept" },
  { value: "Revise and Resubmit", label: "Revise and Resubmit" },
  { value: "Reject", label: "Reject" },
];

export default function ReviewForm({
  submissionId,
  submissionTitle,
  onSubmit,
  onSaveDraft,
}: ReviewFormProps) {
  const [recommendation, setRecommendation] = useState("");
  const [detailedReview, setDetailedReview] = useState("");
  const [confidentialComments, setConfidentialComments] = useState("");
  const [annotatedFile, setAnnotatedFile] = useState<File | undefined>(
    undefined,
  );
  const [errors, setErrors] = useState<{
    recommendation?: string;
    detailedReview?: string;
  }>({});

  const getFormData = (): ReviewFormData => ({
    recommendation,
    detailedReview,
    confidentialComments,
    annotatedFile,
  });

  const validateForm = (): boolean => {
    const newErrors: { recommendation?: string; detailedReview?: string } = {};

    if (!recommendation) {
      newErrors.recommendation = "Please select a recommendation";
    }

    if (!detailedReview.trim()) {
      newErrors.detailedReview = "Please provide a detailed review";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.(getFormData());
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft?.(getFormData());
  };

  const handleFileSelect = (file: File | null) => {
    setAnnotatedFile(file ?? undefined);
  };

  return (
    <div>
      {/* Page/section title: 28px, serif */}
      <h1
        className="text-[28px] mb-1"
        style={{ fontFamily: "Georgia, Times New Roman, serif" }}
      >
        Submit Review
      </h1>

      {/* Submission info: 14px, gray, margin bottom 32px */}
      <div className="text-[14px] text-gray-500 mb-8">
        <p>Submission #{submissionId}</p>
        <p>&ldquo;{submissionTitle}&rdquo;</p>
      </div>

      {/* Form card: white, 32px padding, 1px border, 8px radius */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 border border-[#E0E0E0] rounded-[8px]"
      >
        {/* Your Recommendation - required */}
        <Select
          label="Your Recommendation"
          required
          options={recommendationOptions}
          placeholder="Select recommendation"
          value={recommendation}
          onChange={(e) => {
            setRecommendation(e.target.value);
            if (errors.recommendation) {
              setErrors((prev) => ({ ...prev, recommendation: undefined }));
            }
          }}
          error={errors.recommendation}
          className="mb-6"
        />

        {/* Detailed Review - required, 300px height (~10 rows) */}
        <Textarea
          label="Detailed Review"
          required
          rows={10}
          placeholder="Provide your detailed review of the manuscript..."
          value={detailedReview}
          onChange={(e) => {
            setDetailedReview(e.target.value);
            if (errors.detailedReview) {
              setErrors((prev) => ({ ...prev, detailedReview: undefined }));
            }
          }}
          error={errors.detailedReview}
          className="mb-6"
          style={{ minHeight: "300px" }}
        />

        {/* Confidential Comments to Editor - optional, 120px height (~4 rows) */}
        <Textarea
          label="Confidential Comments to Editor (optional)"
          rows={4}
          placeholder="These comments will only be visible to the editor..."
          value={confidentialComments}
          onChange={(e) => setConfidentialComments(e.target.value)}
          className="mb-6"
          style={{ minHeight: "120px" }}
        />

        {/* Annotated Manuscript - optional, 100px height */}
        <div className="mb-8">
          <FileUpload
            label="Annotated Manuscript (optional)"
            accept=".doc,.docx,.pdf"
            onFileSelect={handleFileSelect}
            className="[&>div:last-of-type]:h-[100px]"
          />
        </div>

        {/* Buttons: Save Draft (secondary, left) | Submit Review (primary, right) */}
        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button type="submit" variant="primary">
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
}
