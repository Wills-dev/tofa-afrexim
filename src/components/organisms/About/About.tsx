import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import MetricCard from "@/components/molecules/MetricCard/MetricCard";
import StatCard from "@/components/molecules/StatCard/StatCard";

import { Globe, TrendingUp, Users } from "lucide-react";

const About = () => {
  return (
    <Section id="about" className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Traders of Africa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering African businesses to connect, trade, and thrive in the
            global economy through innovative digital solutions and strategic
            partnerships.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <StatCard
            icon={<Globe className="w-6 h-6" />}
            title="Our Mission"
            description="To create a seamless digital ecosystem that connects African traders and businesses, facilitating intra-African trade and promoting economic growth across the continent."
            variant="green"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Our Vision"
            description="To become Africa's leading trade facilitation platform, enabling businesses of all sizes to access new markets, secure financing, and build sustainable trading relationships."
            variant="orange"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Our Impact"
            description="Supporting over 1,000 companies across 54 African countries, we've facilitated billions in trade volume while creating jobs and fostering economic development."
            variant="green"
          />
        </div>

        <div className="bg-gradient-to-br from-green-600 to-orange-500 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Why Choose TOFA?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCard
              value="24/7"
              label="Platform Availability"
              variant="dark"
            />
            <MetricCard value="99.9%" label="Uptime Guarantee" variant="dark" />
            <MetricCard
              value="48hrs"
              label="Average Onboarding"
              variant="dark"
            />
            <MetricCard
              value="100+"
              label="Expert Support Staff"
              variant="dark"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
