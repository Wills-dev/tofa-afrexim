import Button from "@/components/atoms/Button/Button";
import { ROUTES } from "@/lib/constants/routes";
import { FileX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col flex flex-col justify-center">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-orange-100 rounded-full p-6">
                <FileX className="h-16 w-16 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Button variant="outline" href={ROUTES?.home}>
              Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
