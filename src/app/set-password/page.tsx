import SetPasswordForm from "@/components/organisms/SetPasswordForm";
import { Suspense } from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);
const page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <SetPasswordForm />
      </div>
    </Suspense>
  );
};

export default page;
