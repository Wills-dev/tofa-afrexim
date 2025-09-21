import { FileIcon, FileText } from "lucide-react";
import React from "react";

export const fileHelpers = () => {
  const getFileExtension = (url: string) => {
    return url.split(".").pop()?.toLowerCase() || "";
  };

  const getFileIcon = (extension: string) => {
    switch (extension) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />;
      case "doc":
      case "docx":
        return <FileIcon className="h-5 w-5 text-blue-600" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileIcon className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getFileTypeLabel = (extension: string) => {
    switch (extension) {
      case "pdf":
        return "PDF Document";
      case "doc":
      case "docx":
        return "Word Document";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "Image File";
      default:
        return "Document";
    }
  };
  return {
    getFileExtension,
    getFileIcon,
    getFileTypeLabel,
  };
};
