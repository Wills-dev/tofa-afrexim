import Card from "@/components/atoms/Card/Card";
import InfoItem from "@/components/molecules/InfoItem/InfoItem";
import {
  Building2,
  CreditCard,
  DollarSign,
  Globe,
  TrendingUp,
} from "lucide-react";
import { CompanyType } from "../types";

const FinancialInformation = ({
  companyData,
}: {
  companyData: CompanyType;
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Financial Information
      </h3>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">
              Annual Turnover
            </span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            $
            {companyData?.annualTurnoverUSD
              ? Number(companyData?.annualTurnoverUSD).toLocaleString()
              : "0:00"}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Total Assets
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            $
            {companyData.totalAssetsUSD
              ? Number(companyData.totalAssetsUSD).toLocaleString()
              : "0:00"}
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-900">
              Current Liquidity
            </span>
          </div>
          <p className="text-2xl font-bold text-orange-900">
            $
            {companyData.currentLiquidityUSD
              ? Number(companyData.currentLiquidityUSD).toLocaleString()
              : "0:00"}
          </p>
        </div>
      </div>

      {/* Financial Details */}
      <div className="space-y-1 divide-y divide-gray-100">
        <InfoItem
          icon={CreditCard}
          label="Local Bank Partners"
          value={companyData?.localBankPartners}
        />

        <InfoItem
          icon={DollarSign}
          label="Maintains Sufficient Liquidity"
          value={companyData?.maintainsSufficientLiquidity}
          type="boolean"
        />

        <InfoItem
          icon={Building2}
          label="Has Trade Finance Facilities"
          value={companyData?.hasTradeFinanceFacilities}
          type="boolean"
        />

        <InfoItem
          icon={Globe}
          label="Transacts in African Currencies"
          value={companyData.transactsInAfricanCurrencies}
          type="boolean"
        />

        {companyData.africanCurrenciesOfInterest && (
          <InfoItem
            icon={DollarSign}
            label="African Currencies of Interest"
            value={companyData.africanCurrenciesOfInterest}
          />
        )}

        <InfoItem
          icon={CreditCard}
          label="Preferred Payment Options"
          value={companyData.preferredPaymentOptions}
          type="list"
        />

        {companyData.preferredPaymentOther && (
          <InfoItem
            icon={CreditCard}
            label="Other Payment Options"
            value={companyData.preferredPaymentOther}
          />
        )}
      </div>
    </Card>
  );
};

export default FinancialInformation;
