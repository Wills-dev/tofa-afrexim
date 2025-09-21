import Button from "@/components/atoms/Button/Button";
import { ROUTES } from "@/lib/constants/routes";
import { Shield } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen justify-center items-center flex bg-gradient-to-br from-red-50 via-white to-orange-50 flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="relative">
            <div className="text-9xl font-bold text-red-200 select-none">
              403
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-100 rounded-full p-6">
                <Shield className="h-16 w-16 text-red-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Access Denied
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              You don't have permission to access this resource. This could be
              due to insufficient privileges or an expired session.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="outline" href={ROUTES?.home}>
              Home
            </Button>
            <Button variant="primary" href={ROUTES?.login}>
              Login
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
