import CheckboxWrapper from "@/components/molecules/CheckboxWrapper/CheckboxWrapper";
import OnBoardInput from "@/components/molecules/OnBoardInput/OnBoardInput";
import OnBoardTextArea from "@/components/molecules/OnBoardTextArea/OnBoardTextArea";
import SingleRadionInputWrapper from "@/components/molecules/SingleRadionInputWrapper/SingleRadionInputWrapper";
import { BusinessProps } from "@/lib/types";
import { paymentOptions, yesNoOption } from "@/services/companies/constants";

const ClientFinancialProfile = ({
  errors,
  companyData,
  handleInputChange,
  handleCheckboxChange,
}: BusinessProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Client Financial Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OnBoardInput
          type="number"
          label="The Annual Turnover (equivalent in USD)"
          value={companyData.annualTurnoverUSD}
          onChange={handleInputChange}
          name="annualTurnoverUSD"
          required
          error={errors.annualTurnoverUSD}
          placeholder="e.g., 23"
        />
      </div>
      {handleCheckboxChange && (
        <CheckboxWrapper
          label="Select Your Preferred Payment Options"
          onChange={handleCheckboxChange}
          required
          value={companyData.preferredPaymentOptions}
          options={paymentOptions}
          error={errors.preferredPaymentOptions}
          name="preferredPaymentOptions"
        />
      )}
      <SingleRadionInputWrapper
        label="Does the company transact in any African local currencies?"
        value={companyData.transactsInAfricanCurrencies}
        onChange={handleInputChange}
        name="transactsInAfricanCurrencies"
        required
        error={errors.transactsInAfricanCurrencies}
        options={yesNoOption}
      />
      <OnBoardTextArea
        name="specifyAfricanCurrencies"
        value={companyData.specifyAfricanCurrencies}
        onChange={handleInputChange}
        label="Specify African local currencies of interest (for payments)"
        required
        error={errors.specifyAfricanCurrencies}
      />
    </div>
  );
};

export default ClientFinancialProfile;
