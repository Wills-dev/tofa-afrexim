import OnBoardTextArea from "@/components/molecules/OnBoardTextArea/OnBoardTextArea";
import SingleRadionInputWrapper from "@/components/molecules/SingleRadionInputWrapper/SingleRadionInputWrapper";
import { BusinessProps } from "@/lib/types";
import { yesNoOption } from "@/services/companies/constants";

const BusinessProfile = ({
  errors,
  companyData,
  handleInputChange,
}: BusinessProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Client Business Profile
      </h2>

      <div className="space-y-4">
        <SingleRadionInputWrapper
          label="Is the company officially registered and actively operating?"
          value={companyData.isOfficiallyRegistered}
          onChange={handleInputChange}
          name="isOfficiallyRegistered"
          required
          error={errors.isOfficiallyRegistered}
          options={yesNoOption}
        />
        <SingleRadionInputWrapper
          label="Do they hold a valid and up-to-date business registration certificate/licence and tax ID?"
          value={companyData.hasValidLicense}
          onChange={handleInputChange}
          name="hasValidLicense"
          required
          error={errors.hasValidLicense}
          options={yesNoOption}
        />
        <SingleRadionInputWrapper
          label="Does the company engage in cross-border trade (exporting/importing)?"
          value={companyData.engagesInCrossBorderTrade}
          onChange={handleInputChange}
          name="engagesInCrossBorderTrade"
          required
          error={errors.engagesInCrossBorderTrade}
          options={yesNoOption}
        />
        <SingleRadionInputWrapper
          label="Does the company hold a valid import/export licence?"
          value={companyData.hasImportExportLicense}
          onChange={handleInputChange}
          name="hasImportExportLicense"
          required
          error={errors.hasImportExportLicense}
          options={yesNoOption}
        />
        <OnBoardTextArea
          name="listTradePartners"
          value={companyData.listTradePartners}
          onChange={handleInputChange}
          label="List the trade partners (suppliers, buyers, logistics providers) the company is already working with or wants to work with."
          required
          error={errors.listTradePartners}
        />
        <OnBoardTextArea
          name="localBankPartners"
          value={companyData.localBankPartners}
          onChange={handleInputChange}
          label="List the local banks the company has an account with"
          required
          error={errors.localBankPartners}
        />
      </div>
    </div>
  );
};

export default BusinessProfile;
