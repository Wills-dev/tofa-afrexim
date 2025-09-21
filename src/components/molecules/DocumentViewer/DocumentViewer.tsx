import Button from "@/components/atoms/Button/Button";
import { fileHelpers } from "@/lib/helpers/fileHelpers";
import { useGetDocumentUrl } from "@/lib/hooks/useGetDocumentUrl";
import { Download, ExternalLink, Eye } from "lucide-react";

const DocumentViewer: React.FC<{
  url: string;
  title: string;
}> = ({ url, title }) => {
  const { parseDocumentUrl } = useGetDocumentUrl();
  const { getFileExtension, getFileIcon, getFileTypeLabel } = fileHelpers();
  const cleanUrl = parseDocumentUrl(url);

  const extension = getFileExtension(cleanUrl);
  const fileIcon = getFileIcon(extension);
  const fileTypeLabel = getFileTypeLabel(extension);

  const handleView = () => {
    window.open(cleanUrl, "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cleanUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        {fileIcon}
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{fileTypeLabel}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={handleView}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleView}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentViewer;
