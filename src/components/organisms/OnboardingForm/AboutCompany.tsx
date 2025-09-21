"use client";

import OnBoardInput from "@/components/molecules/OnBoardInput/OnBoardInput";
import OnBoardSelect from "@/components/molecules/OnBoardSelect/OnBoardSelect";
import OnBoardTextArea from "@/components/molecules/OnBoardTextArea/OnBoardTextArea";
import SingleRadionInputWrapper from "@/components/molecules/SingleRadionInputWrapper/SingleRadionInputWrapper";
import { BusinessProps } from "@/lib/types";
import {
  businessSectorOptions,
  tradeRoleOption,
} from "@/services/companies/constants";

const AboutCompany = ({
  errors,
  companyData,
  handleInputChange,
}: BusinessProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Client Minimum Eligibility
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OnBoardInput
          label="Client Company Name"
          value={companyData.companyName}
          onChange={handleInputChange}
          name="companyName"
          required
          error={errors.companyName}
        />
      </div>
      <OnBoardTextArea
        name="companyDescription"
        value={companyData.companyDescription}
        onChange={handleInputChange}
        label="About the Company"
        required
        error={errors.companyDescription}
        description="(500 words max.) Short description of the company activities, market presence and trade history"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OnBoardInput
          label="Admin First Name"
          value={companyData.adminFirstName}
          onChange={handleInputChange}
          name="adminFirstName"
          required
          error={errors.adminFirstName}
        />
        <OnBoardInput
          label="Admin Last Name"
          value={companyData.adminLastName}
          onChange={handleInputChange}
          name="adminLastName"
          required
          error={errors.adminLastName}
        />
        <OnBoardInput
          label="Admin Email Address"
          value={companyData.adminEmail}
          onChange={handleInputChange}
          name="adminEmail"
          required
          error={errors.adminEmail}
        />
        <div className="grid grid-cols-7 gap-2">
          <OnBoardInput
            label="Country code"
            value={companyData.adminCountryCode}
            onChange={handleInputChange}
            name="adminCountryCode"
            required
            error={errors.adminCountryCode}
            className="col-span-2"
            type="tel"
          />
          <OnBoardInput
            label="Reachable Phone Number"
            value={companyData.adminPhoneNumber}
            onChange={handleInputChange}
            name="adminPhoneNumber"
            required
            error={errors.adminPhoneNumber}
            className="col-span-5"
            type="tel"
          />
        </div>
        <SingleRadionInputWrapper
          label="What is your role in the trade ecosystem?"
          value={companyData.tradeRole}
          onChange={handleInputChange}
          name="tradeRole"
          required
          error={errors.tradeRole}
          options={tradeRoleOption}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OnBoardSelect
          label="What is your business sector?"
          value={companyData.businessSector}
          onChange={handleInputChange}
          name="businessSector"
          required
          error={errors.businessSector}
          options={businessSectorOptions}
          description="You can only select one sector"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OnBoardInput
          label="Which products and/or services are you supplying or buying?"
          value={companyData.productsServices}
          onChange={handleInputChange}
          name="productsServices"
          required
          error={errors.productsServices}
          description="(100 words max.) List only the products and services."
        />
      </div>
      <OnBoardInput
        label="Address"
        value={companyData.streetAddress}
        onChange={handleInputChange}
        name="streetAddress"
        required
        error={errors.streetAddress}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OnBoardInput
          label="City"
          value={companyData.city}
          onChange={handleInputChange}
          name="city"
          required
          error={errors.city}
        />
        <OnBoardInput
          label="Country"
          value={companyData.country}
          onChange={handleInputChange}
          name="country"
          required
          error={errors.country}
        />
      </div>
      <OnBoardInput
        label="Postal / Zip Code"
        value={companyData.postalCode}
        onChange={handleInputChange}
        name="postalCode"
        required
        error={errors.postalCode}
      />
    </div>
  );
};

export default AboutCompany;
