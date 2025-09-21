"use client";

import { useEffect, useRef, useState } from "react";

import { SortOptionsType } from "@/lib/types";
import { Filter } from "lucide-react";

interface SortDropdownProps {
  className?: string;
  onChange: (sort: string) => void;
  value: string;
  options: SortOptionsType[];
}

const SortDropdown = ({
  className,
  value,
  onChange,
  options,
}: SortDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative space-x-6 flex items-center max-md:hidden text-left ${className}`}
      ref={dropdownRef}
    >
      <span>|</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="outline-none dark:text-gray-300 dark:hover:text-gray-100 text-gray-600 text-sm hover:text-gray-800 transition-all duration-300 flex items-center gap-1"
      >
        <Filter className="w-4 h-4 " />
        <span>Filter</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-2 max-w-72 w-full origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
          <div className="py-1">
            <div className="space-y-1">
              {options.map((sort: SortOptionsType) => (
                <button
                  key={sort.label}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                    value === sort.value
                      ? "bg-blue-100 text-green-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => onChange(sort.value)}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
