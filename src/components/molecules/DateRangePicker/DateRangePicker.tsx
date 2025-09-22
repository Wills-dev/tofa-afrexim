"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange, DateRangePickerProps } from "@/lib/types";
import { getSelectedDays } from "@/lib/helpers/dateFormats";

const DateRangePicker = ({
  onDateRangeChange,
  maxRangeDays,
  className = "",
  placeholder = "Select date range",
}: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const minDate = new Date("2025-09-01");
  const maxDate = new Date();

  // Reset maxDate to end of today to allow selection of today
  maxDate.setHours(23, 59, 59, 999);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDisplayText = () => {
    if (!dateRange.startDate && !dateRange.endDate) {
      return placeholder;
    }
    if (dateRange.startDate && !dateRange.endDate) {
      return `${formatDate(dateRange.startDate)} - Select end date`;
    }
    if (dateRange.startDate && dateRange.endDate) {
      return `${formatDate(dateRange.startDate)} - ${formatDate(
        dateRange.endDate
      )}`;
    }
    return placeholder;
  };

  const isDateDisabled = (date: Date) => {
    // Disable dates before minDate or after maxDate
    if (date < minDate || date > maxDate) {
      return true;
    }

    // If selecting end date and maxRangeDays is specified
    if (selectingEnd && dateRange.startDate && maxRangeDays) {
      const daysDiff = Math.ceil(
        (date.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff > maxRangeDays) {
        return true;
      }
    }

    // If selecting end date, disable dates before start date
    if (selectingEnd && dateRange.startDate && date < dateRange.startDate) {
      return true;
    }

    return false;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!dateRange.startDate || selectingEnd) {
      // Selecting start date or end date
      if (!dateRange.startDate) {
        // First selection - set start date
        const newRange = { startDate: date, endDate: null };
        setDateRange(newRange);
        setSelectingEnd(true);

        // Call callback with formatted dates (only startDate selected)
        if (onDateRangeChange) {
          onDateRangeChange({
            startDate: date,
            endDate: null,
          });
        }
      } else {
        // Second selection - set end date
        const newRange = { ...dateRange, endDate: date };
        setDateRange(newRange);
        setSelectingEnd(false);
        setIsOpen(false);

        // Call the callback function with formatted dates
        if (onDateRangeChange) {
          onDateRangeChange({
            startDate: newRange.startDate,
            endDate: date,
          });
        }
      }
    } else {
      // Reset and start over
      const newRange = { startDate: date, endDate: null };
      setDateRange(newRange);
      setSelectingEnd(true);

      // Call callback with formatted dates (only startDate selected)
      if (onDateRangeChange) {
        onDateRangeChange({
          startDate: date,
          endDate: null,
        });
      }
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newRange = { startDate: null, endDate: null };
    setDateRange(newRange);
    setSelectingEnd(false);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
        onClick={toggleDropdown}
        type="button"
      >
        <Calendar className="mr-2 h-4 w-4" />
        <span
          className={
            dateRange.startDate || dateRange.endDate
              ? "text-gray-900"
              : "text-gray-500"
          }
        >
          {getDisplayText()}
        </span>
        {(dateRange.startDate || dateRange.endDate) && (
          <span
            onClick={clearSelection}
            className="ml-auto h-4 w-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs cursor-pointer transition-colors"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                clearSelection(e as any);
              }
            }}
            aria-label="Clear selection"
          >
            ×
          </span>
        )}
      </Button>

      {/* Custom Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
          style={{ width: "300px", maxHeight: "400px" }}
        >
          <div className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-3 pb-2 border-b border-gray-100">
              {!dateRange.startDate
                ? "📅 Select start date"
                : selectingEnd
                ? "📅 Select end date"
                : "✅ Range selected"}
              {maxRangeDays && (
                <span className="block text-xs mt-1 text-gray-500">
                  Maximum range: {maxRangeDays} days
                </span>
              )}
            </div>

            {/* Calendar Container with inline styles */}
            <div
              className="calendar-container"
              style={{
                fontSize: "14px",
              }}
            >
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .calendar-container .rdp {
                    margin: 0;
                    font-size: 14px;
                  }
                  
                  .calendar-container .rdp-months {
                    display: flex;
                    justify-content: center;
                  }
                  
                  .calendar-container .rdp-month {
                    margin: 0;
                  }
                  
                  .calendar-container .rdp-caption {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 8px 0;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #374151;
                  }
                  
                  .calendar-container .rdp-nav {
                    position: absolute;
                    top: 8px;
                    display: flex;
                    align-items: center;
                  }
                  
                  .calendar-container .rdp-nav_button {
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    border: none;
                    background: #f3f4f6;
                    color: #6b7280;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                  }
                  
                  .calendar-container .rdp-nav_button:hover {
                    background: #e5e7eb;
                    color: #374151;
                  }
                  
                  .calendar-container .rdp-nav_button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                  }
                  
                  .calendar-container .rdp-nav_button_previous {
                    left: 8px;
                  }
                  
                  .calendar-container .rdp-nav_button_next {
                    right: 8px;
                  }
                  
                  .calendar-container .rdp-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 0;
                  }
                  
                  .calendar-container .rdp-head_cell {
                    width: 36px;
                    height: 32px;
                    text-align: center;
                    font-weight: 500;
                    color: #6b7280;
                    font-size: 12px;
                  }
                  
                  .calendar-container .rdp-cell {
                    width: 36px;
                    height: 36px;
                    text-align: center;
                    padding: 0;
                  }
                  
                  .calendar-container .rdp-button {
                    width: 32px;
                    height: 32px;
                    border: none;
                    border-radius: 6px;
                    background: transparent;
                    color: #374151;
                    cursor: pointer;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    transition: all 0.15s ease;
                  }
                  
                  .calendar-container .rdp-button:hover {
                    background: #f3f4f6;
                    color: #1f2937;
                  }
                  
                  .calendar-container .rdp-day_selected {
                    background: #3b82f6 !important;
                    color: white !important;
                    font-weight: 600;
                  }
                  
                  .calendar-container .rdp-day_selected:hover {
                    background: #2563eb !important;
                  }
                  
                  .calendar-container .rdp-day_disabled {
                    color: #d1d5db !important;
                    cursor: not-allowed !important;
                  }
                  
                  .calendar-container .rdp-day_disabled:hover {
                    background: transparent !important;
                  }
                  
                  .calendar-container .rdp-day_outside {
                    color: #d1d5db;
                  }
                  
                  .calendar-container .rdp-day_today {
                    font-weight: 600;
                    background: #fef3c7;
                    color: #d97706;
                  }
                  
                  .calendar-container .rdp-day_today:hover {
                    background: #fde68a;
                  }
                  
                  .calendar-container .rdp-day_today.rdp-day_selected {
                    background: #3b82f6 !important;
                    color: white !important;
                  }
                `,
                }}
              />

              <CalendarComponent
                mode="single"
                selected={dateRange.endDate || dateRange.startDate || undefined}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                modifiers={{
                  selected: getSelectedDays(dateRange),
                  range_start: dateRange.startDate ? [dateRange.startDate] : [],
                  range_end: dateRange.endDate ? [dateRange.endDate] : [],
                  range_middle: getSelectedDays(dateRange).slice(1, -1),
                }}
                className="rdp-custom"
                showOutsideDays={false}
              />
            </div>
            {/* {dateRange.startDate && dateRange.endDate && (
              <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
                <div className="font-medium">Selected Range:</div>
                <div>
                  {formatDate(dateRange.startDate)} to{" "}
                  {formatDate(dateRange.endDate)}
                </div>
                <div className="text-gray-600">
                  {Math.ceil(
                    (dateRange.endDate.getTime() -
                      dateRange.startDate.getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}{" "}
                  days
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
