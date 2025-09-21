import Card from "@/components/atoms/Card/Card";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import MetricCard from "@/components/molecules/MetricCard/MetricCard";
import PartnershipInfo from "@/components/molecules/PartnershipInfo/PartnershipInfo";

import { Building, Globe } from "lucide-react";

const Partnership: React.FC = () => {
  return (
    <Section id="partnership" className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powered by Strategic Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our collaboration with Afrexim Bank and African Trade Gateway
            creates unprecedented opportunities for African businesses to thrive
            in the global marketplace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <PartnershipInfo
              title="Afrexim Bank"
              subtitle="Financial Partner"
              description="Africa's premier trade finance institution, providing the financial backbone for continental trade growth and development across all 54 African countries."
              icon={<Building className="w-8 h-8" />}
              variant="green"
            />

            <PartnershipInfo
              title="African Trade Gateway"
              subtitle="Technology Partner"
              description="Leading digital trade platform connecting African businesses with global markets through innovative technology solutions and comprehensive trade services."
              icon={<Globe className="w-8 h-8" />}
              variant="orange"
            />
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-orange-100 rounded-2xl p-12">
              <div className="text-center space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">
                  Together We Enable
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <MetricCard value="$50B+" label="Trade Facilitated" />
                  </Card>
                  <Card className="shadow-sm">
                    <MetricCard value="10K+" label="Businesses Connected" />
                  </Card>
                  <Card className="shadow-sm">
                    <MetricCard value="54" label="Countries Covered" />
                  </Card>
                  <Card className="shadow-sm">
                    <MetricCard value="24/7" label="Support Available" />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Partnership;
