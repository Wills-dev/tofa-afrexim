import { SectionProps } from "@/lib/types";

const Section = ({ id, className = "", children }: SectionProps) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

export default Section;
