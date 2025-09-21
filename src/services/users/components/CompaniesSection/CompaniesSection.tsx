import Button from "@/components/atoms/Button/Button";
import DataTable from "@/components/organisms/DataTable/DataTable";

import { ROUTES } from "@/lib/constants/routes";
import { CompanyType } from "@/services/companies/types";
import { Building, Plus } from "lucide-react";
import { Column } from "./Column";

interface CompaniesSectionProps {
  companies: CompanyType[];
  totalPages: number;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  goToLastPage: () => void;
  goToFirstPage: () => void;
  isFirstPage: () => boolean;
  isLastPage: () => boolean;
  limit: number;
  setLimit: (limit: number) => void;
  isSameUser: boolean;
}

const CompaniesSection = ({
  companies,
  totalPages,
  currentPage,
  prevPage,
  nextPage,
  goToLastPage,
  goToFirstPage,
  isFirstPage,
  isLastPage,
  limit,
  setLimit,
  isSameUser,
}: CompaniesSectionProps) => {
  return (
    <div className="py-6">
      <div className="flex sm:items-center justify-between max-sm:flex-col gap-2 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Companies</h3>
          <p className="text-sm text-gray-600">
            {companies.length} companies onboarded
          </p>
        </div>
        {isSameUser && (
          <Button
            href={ROUTES?.onboard}
            variant="outline"
            size="sm"
            icon={<Plus className="h-4 w-4 mr-2" />}
          >
            Add Company
          </Button>
        )}
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-12 flex justify-center items-center flex-col">
          <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No Companies
          </h4>
          <p className="text-gray-600 mb-4">
            This user hasn't onboarded any companies yet.
          </p>
          {isSameUser && (
            <Button
              href={ROUTES?.onboard}
              icon={<Plus className="h-4 w-4 mr-2" />}
            >
              Onboard First Company
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <DataTable
            columns={Column}
            data={companies}
            totalPages={totalPages}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            goToLastPage={goToLastPage}
            goToFirstPage={goToFirstPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      )}
    </div>
  );
};

export default CompaniesSection;
