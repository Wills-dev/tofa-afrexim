import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePaginationState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 10;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      return;
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      return;
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const isLastPage = () => {
    return currentPage === totalPages;
  };

  const isFirstPage = () => {
    return currentPage === 1;
  };

  const updateUrl = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("limit", String(newLimit));
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    updateUrl(currentPage, limit);
  }, [currentPage, limit]);

  return {
    loading,
    setLoading,
    currentPage,
    totalPages,
    setTotalPages,
    limit,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    searchTerm,
    setSearchTerm,
    handleSearch,
    setCurrentPage,
    totalItems,
    setTotalItems,
  };
};
