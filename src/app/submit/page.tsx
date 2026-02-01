"use client";

import { useState, FormEvent } from "react";
import TextInput from "@/components/ui/TextInput";
import Textarea from "@/components/ui/Textarea";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";

interface FormData {
  articleTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
  biography: string;
  manuscriptFile: File | null;
}

interface FormErrors {
  articleTitle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  manuscriptFile?: string;
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    articleTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    affiliation: "",
    biography: "",
    manuscriptFile: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.articleTitle.trim()) {
      newErrors.articleTitle = "Article title is required";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.manuscriptFile) {
      newErrors.manuscriptFile = "Manuscript file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Submission received!");
    }
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData);
    alert("Draft saved!");
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileSelect = (file: File | null) => {
    setFormData((prev) => ({ ...prev, manuscriptFile: file }));
    if (errors.manuscriptFile) {
      setErrors((prev) => ({ ...prev, manuscriptFile: undefined }));
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[32px] font-bold font-serif text-gray-900 mb-4">
            Submit Your Work
          </h1>
          <p
            className="text-[15px] text-gray-600 leading-[1.6] max-w-[700px]"
          >
            We welcome submissions that engage with affect theory and cultural
            studies. Please complete the form below.
          </p>
        </header>

        {/* Form Container */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Article Title */}
            <div className="mb-6">
              <TextInput
                label="Article Title"
                required
                value={formData.articleTitle}
                onChange={(e) =>
                  handleInputChange("articleTitle", e.target.value)
                }
                error={errors.articleTitle}
                placeholder="Enter your article title"
              />
            </div>

            {/* First Name and Last Name */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 sm:basis-[48%]">
                <TextInput
                  label="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  error={errors.firstName}
                  placeholder="First name"
                />
              </div>
              <div className="flex-1 sm:basis-[48%]">
                <TextInput
                  label="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  error={errors.lastName}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <TextInput
                label="Email Address"
                required
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
                placeholder="your.email@example.com"
              />
            </div>

            {/* Institutional Affiliation */}
            <div className="mb-6">
              <TextInput
                label="Institutional Affiliation"
                value={formData.affiliation}
                onChange={(e) =>
                  handleInputChange("affiliation", e.target.value)
                }
                placeholder="University or institution name"
              />
            </div>

            {/* Short Biography */}
            <div className="mb-6">
              <Textarea
                label="Short Biography"
                rows={4}
                value={formData.biography}
                onChange={(e) => handleInputChange("biography", e.target.value)}
                placeholder="Tell us about yourself..."
              />
              <p className="text-sm text-gray-500 mt-1">200 words max</p>
            </div>

            {/* Manuscript File */}
            <div className="mb-6">
              <FileUpload
                label="Manuscript File"
                required
                accept=".doc,.docx,.rtf"
                maxSize={10 * 1024 * 1024}
                onFileSelect={handleFileSelect}
                error={errors.manuscriptFile}
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: .doc, .docx, .rtf (max 10MB)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Button type="submit" variant="primary">
                Submit Manuscript
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
