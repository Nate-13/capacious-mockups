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
          <label className="text-[14px] font-bold mb-2 text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative h-[160px]
            border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center
            transition-colors
            ${
              displayError
                ? "border-red-400 bg-red-50"
                : isDragging
                  ? "border-gray-400 bg-gray-100"
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
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">📄</span>
              <span className="text-[15px] text-gray-900 font-medium">
                {fileName}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Remove
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <span className="text-3xl">📄</span>
              <span className="text-[15px] text-gray-700">
                Drop your file here or click to browse
              </span>
              {accept && (
                <span className="text-sm text-gray-500">
                  Accepted formats: {accept}
                </span>
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
