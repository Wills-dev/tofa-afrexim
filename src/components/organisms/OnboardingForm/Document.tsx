import { Ref } from "react";

import OnBoardInput from "@/components/molecules/OnBoardInput/OnBoardInput";
import { FormErrors } from "@/services/companies/types";

interface DocumentProps {
  fileInputRef: Ref<HTMLInputElement>;
  additionalDocsRef: Ref<HTMLInputElement>;
  handleFileChange: (e: any) => void;
  errors: FormErrors;
}

const Document = ({
  handleFileChange,
  fileInputRef,
  additionalDocsRef,
  errors,
}: DocumentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Document Upload
      </h2>

      <div className="space-y-4">
        <OnBoardInput
          label="Upload the valid company registration document/business license"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          name="registrationDocument"
          required
          error={errors.registrationDocument}
          description="This document should be PDF only without a password."
        />
        <OnBoardInput
          label="Upload any other relevant documents (products catalogue, product quality certification)"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          ref={additionalDocsRef}
          name="otherDocuments"
          description="This document should be PDF only without a password."
        />
      </div>
    </div>
  );
};

export default Document;
