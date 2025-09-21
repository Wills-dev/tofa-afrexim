import Button from "@/components/atoms/Button/Button";
import Card from "@/components/atoms/Card/Card";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import MetricCard from "@/components/molecules/MetricCard/MetricCard";
import StatCard from "@/components/molecules/StatCard/StatCard";

import { ROUTES } from "@/lib/constants/routes";
import { ArrowRight, Award, Building, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <Section className="relative bg-gradient-to-br from-green-50 to-orange-50 pt-16 pb-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connecting Africa's
                <span className="text-green-600"> Trade </span>
                Ecosystem
              </h1>
              <p className="text-xl text-gray-600 mt-6">
                In partnership with Afrexim Bank and African Trade Gateway, TOFA
                empowers businesses across Africa to unlock new opportunities
                and drive continental trade growth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get Started
              </Button>
              <Button variant="secondary" size="lg" href={ROUTES?.onboard}>
                Onboard New Company
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-gray-600">
              <MetricCard value="1000+" label="Companies" />
              <MetricCard value="54" label="African Countries" />
              <MetricCard value="$2B+" label="Trade Volume" />
            </div>
          </div>
          <div className="relative">
            <Card className="relative z-10" padding="lg">
              <div className="space-y-6">
                <StatCard
                  icon={<Building className="w-6 h-6" />}
                  title="Company Onboarding"
                  description="Seamless registration process"
                  variant="green"
                />
                <StatCard
                  icon={<Shield className="w-6 h-6" />}
                  title="Secure Platform"
                  description="Enterprise-grade security"
                  variant="orange"
                />
                <StatCard
                  icon={<Award className="w-6 h-6" />}
                  title="Trusted Partnership"
                  description="Backed by Afrexim Bank & ATG"
                  variant="green"
                />
              </div>
            </Card>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-orange-200 rounded-full opacity-20"></div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
