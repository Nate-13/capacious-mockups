"use client";

import {
  forwardRef,
  useState,
  useCallback,
  DragEvent,
  ChangeEvent,
} from "react";

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  actionAccent?: boolean;
  className?: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      accept,
      maxSize,
      onFileSelect,
      error,
      required,
      disabled,
      actionAccent,
      className = "",
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const validateFile = useCallback(
      (file: File): boolean => {
        if (maxSize && file.size > maxSize) {
          setFileError(
            `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
          );
          return false;
        }
        setFileError(null);
        return true;
      },
      [maxSize],
    );

    const handleFile = useCallback(
      (file: File) => {
        if (validateFile(file)) {
          setFileName(file.name);
          onFileSelect?.(file);
        }
      },
      [validateFile, onFileSelect],
    );

    const handleDragOver = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) {
          setIsDragging(true);
        }
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
          handleFile(files[0]);
        }
      },
      [disabled, handleFile],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          handleFile(files[0]);
        }
      },
      [handleFile],
    );

    const handleClear = useCallback(() => {
      setFileName(null);
      setFileError(null);
      onFileSelect?.(null);
    }, [onFileSelect]);

    const displayError = fileError || error;

    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="flex items-center gap-1.5 text-[14px] font-bold mb-2 text-gray-900">
            {actionAccent && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            )}
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative py-6 px-4
            border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center
            transition-colors
            ${
              displayError
                ? "border-red-400 bg-red-50"
                : isDragging
                  ? "border-gray-400 bg-gray-100"
                  : actionAccent
                    ? "border-[#F97316]/40 bg-[#FFF7ED] hover:bg-[#FFF1E0]"
                    : "border-[#CCC] bg-[#FAFAFA] hover:bg-gray-100"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <input
            ref={ref}
            type="file"
            accept={accept}
            onChange={handleChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          {fileName ? (
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-[14px] text-gray-900 font-medium">
                {fileName}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-[12px] text-gray-500 hover:text-gray-700 underline"
                >
                  Remove
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-[14px] text-gray-600">
                Drop file here or{" "}
                <span className="text-gray-800 font-medium underline">
                  browse
                </span>
              </span>
              {accept && (
                <span className="text-[12px] text-gray-400">{accept}</span>
              )}
            </div>
          )}
        </div>
        {displayError && (
          <span className="text-red-500 text-sm mt-1">{displayError}</span>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
