import Card from "@/components/atoms/Card/Card";
import DocumentViewer from "@/components/molecules/DocumentViewer/DocumentViewer";

import { FileText } from "lucide-react";

import { CompanyType } from "../types";

const DocumentsSection = ({ companyData }: { companyData: CompanyType }) => {
  // Parse other documents URLs
  const parseOtherDocuments = (documents: string[]) => {
    const allDocs: string[] = [];

    documents.forEach((doc) => {
      try {
        if (doc.startsWith("[") && doc.endsWith("]")) {
          const parsed = JSON.parse(doc);
          if (Array.isArray(parsed)) {
            allDocs.push(...parsed);
          } else {
            allDocs.push(doc);
          }
        } else {
          allDocs.push(doc);
        }
      } catch {
        allDocs.push(doc);
      }
    });

    return allDocs.filter((url) => url && url.trim() !== "");
  };

  const otherDocs = parseOtherDocuments(companyData?.otherDocumentsUrl);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Documents</h3>

      <div className="space-y-4">
        {/* Registration Document */}
        {companyData.registrationDocumentUrl && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Registration Document
            </h4>
            <DocumentViewer
              url={companyData.registrationDocumentUrl}
              title="Company Registration Document"
            />
          </div>
        )}

        {/* Other Documents */}
        {otherDocs.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Other Documents ({otherDocs.length})
            </h4>
            <div className="space-y-3">
              {otherDocs.map((doc, index) => (
                <DocumentViewer
                  key={index}
                  url={doc}
                  title={`Supporting Document ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        {!companyData.registrationDocumentUrl && otherDocs.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No documents uploaded</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DocumentsSection;
