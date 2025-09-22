import Image from "next/image";
import Link from "next/link";

import { LogoProps } from "@/lib/types";
import { ROUTES } from "@/lib/constants/routes";

const Logo = ({ size = "md" }: LogoProps) => {
  const sizes = {
    sm: { container: "w-10 h-auto", size: 40 },
    md: { container: "w-12 h-auto", size: 60 },
    lg: { container: "w-14 h-auto", size: 80 },
  };
  return (
    <Link href={ROUTES?.home}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        priority
        width={sizes[size].size}
        height={sizes[size].size}
        className={`object-contain ${sizes[size].container}`}
      />
    </Link>
  );
};

export default Logo;
