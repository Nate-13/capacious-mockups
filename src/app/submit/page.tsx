"use client";

import { useState, FormEvent } from "react";
import TextInput from "@/components/ui/TextInput";
import Textarea from "@/components/ui/Textarea";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useRole } from "@/context/RoleContext";

interface FormData {
  articleTitle: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  pronouns: string;
  email: string;
  affiliation: string;
  biography: string;
  manuscriptFile: File | null;
  contentType: string;
  initialStatus: string;
  editorNotes: string;
}

interface FormErrors {
  articleTitle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  manuscriptFile?: string;
}

interface UploadedFile {
  id: string;
  file: File;
}

export default function SubmitPage() {
  const { role } = useRole();
  const isEditor = role === "Managing Editor" || role === "Admin";

  const [formData, setFormData] = useState<FormData>({
    articleTitle: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    pronouns: "",
    email: "",
    affiliation: "",
    biography: "",
    manuscriptFile: null,
    contentType: "Article",
    initialStatus: "In Desk Review",
    editorNotes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imageFiles, setImageFiles] = useState<UploadedFile[]>([]);
  const [supplementaryFiles, setSupplementaryFiles] = useState<UploadedFile[]>(
    [],
  );

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

  const handleMultiFileAdd = (
    file: File | null,
    setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  ) => {
    if (file) {
      setter((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, file },
      ]);
    }
  };

  const handleMultiFileRemove = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  ) => {
    setter((prev) => prev.filter((f) => f.id !== id));
  };

  const pronounOptions = [
    { value: "", label: "" },
    { value: "she/her", label: "she/her" },
    { value: "he/him", label: "he/him" },
    { value: "they/them", label: "they/them" },
    { value: "Other", label: "Other" },
  ];

  const contentTypeOptions = [
    { value: "Article", label: "Article" },
    { value: "Dialogue", label: "Dialogue" },
    { value: "Interstice", label: "Interstice" },
    { value: "Introduction", label: "Introduction" },
    { value: "Afterword", label: "Afterword" },
    { value: "Book Review", label: "Book Review" },
  ];

  const initialStatusOptions = [
    { value: "In Desk Review", label: "In Desk Review" },
    { value: "In Copy Editing", label: "In Copy Editing" },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[32px] font-bold font-serif text-gray-900 mb-4">
            Submit Your Work
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.6] max-w-[700px]">
            We welcome submissions that engage with affect theory and cultural
            studies. Please complete the form below.
          </p>
        </header>

        {/* Form Container */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Editor-Only Section */}
            {isEditor && (
              <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8 border border-[#E0E0E0]">
                <h2 className="text-[18px] font-bold text-gray-900 mb-1">
                  Editor Entry
                </h2>
                <p className="text-[14px] text-gray-500 mb-5">
                  Entering a submission on behalf of an author or for invited
                  content.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-5">
                  <div className="flex-1">
                    <Select
                      label="Content Type"
                      options={contentTypeOptions}
                      value={formData.contentType}
                      onChange={(e) =>
                        handleInputChange("contentType", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      label="Initial Status"
                      options={initialStatusOptions}
                      value={formData.initialStatus}
                      onChange={(e) =>
                        handleInputChange("initialStatus", e.target.value)
                      }
                    />
                  </div>
                </div>

                <Textarea
                  label="Editor Notes"
                  rows={3}
                  value={formData.editorNotes}
                  onChange={(e) =>
                    handleInputChange("editorNotes", e.target.value)
                  }
                  placeholder="Internal notes about this submission"
                />
              </div>
            )}

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

            {/* Preferred Name and Pronouns */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <TextInput
                  label="Preferred Name"
                  value={formData.preferredName}
                  onChange={(e) =>
                    handleInputChange("preferredName", e.target.value)
                  }
                  placeholder="How would you like to be addressed?"
                />
              </div>
              <div className="sm:w-[180px]">
                <Select
                  label="Pronouns"
                  options={pronounOptions}
                  value={formData.pronouns}
                  onChange={(e) =>
                    handleInputChange("pronouns", e.target.value)
                  }
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

            {/* High-Resolution Images */}
            <div className="mb-6">
              <FileUpload
                label="High-Resolution Images (optional)"
                accept=".jpg,.jpeg,.png,.tiff,.tif"
                maxSize={50 * 1024 * 1024}
                onFileSelect={(file) => handleMultiFileAdd(file, setImageFiles)}
              />
              <p className="text-sm text-gray-500 mt-1">
                If your manuscript contains images, please upload
                high-resolution versions here.
              </p>
              {imageFiles.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {imageFiles.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between bg-[#FAFAFA] border border-[#E0E0E0] rounded-[6px] px-4 py-2"
                    >
                      <span className="text-[14px] text-gray-700 truncate mr-3">
                        {f.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleMultiFileRemove(f.id, setImageFiles)
                        }
                        className="text-sm text-gray-500 hover:text-gray-700 underline shrink-0"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Supplementary Materials */}
            <div className="mb-6">
              <FileUpload
                label="Supplementary Materials (optional)"
                accept=".mp4,.mov,.csv,.xlsx,.pdf"
                maxSize={100 * 1024 * 1024}
                onFileSelect={(file) =>
                  handleMultiFileAdd(file, setSupplementaryFiles)
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                Video files, datasets, or other supplementary materials.
              </p>
              {supplementaryFiles.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {supplementaryFiles.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between bg-[#FAFAFA] border border-[#E0E0E0] rounded-[6px] px-4 py-2"
                    >
                      <span className="text-[14px] text-gray-700 truncate mr-3">
                        {f.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleMultiFileRemove(f.id, setSupplementaryFiles)
                        }
                        className="text-sm text-gray-500 hover:text-gray-700 underline shrink-0"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Button type="submit" variant="primary">
                Submit Manuscript
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
              >
                Save as Draft
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
