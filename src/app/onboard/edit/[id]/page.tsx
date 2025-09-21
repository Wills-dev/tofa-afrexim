"use client";

import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const companyId = params.id as string;

  return <div>page</div>;
};

export default page;
