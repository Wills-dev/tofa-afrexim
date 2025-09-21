"use client";

import React, { useState } from "react";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

  const minDate = new Date("2025-09-01");
  const maxDate = new Date();

  // Reset maxDate to end of today to allow selection of today
  maxDate.setHours(23, 59, 59, 999);

  // Helper function to format date to YYYY-MM-DD
  const formatDateForCallback = (date: Date | null): string | null => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

  return (
    <div className={`relative ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span
              className={
                dateRange.startDate || dateRange.endDate
                  ? "text-foreground"
                  : "text-muted-foreground"
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
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="text-sm text-muted-foreground mb-2">
              {!dateRange.startDate
                ? "Select start date"
                : selectingEnd
                ? "Select end date"
                : "Range selected"}
              {maxRangeDays && (
                <span className="block text-xs mt-1">
                  Maximum range: {maxRangeDays} days
                </span>
              )}
            </div>
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
              modifiersStyles={{
                selected: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                },
                range_start: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                },
                range_end: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                },
                range_middle: {
                  backgroundColor: "hsl(var(--primary))",
                  opacity: 0.3,
                },
              }}
              initialFocus
            />
            {dateRange.startDate && dateRange.endDate && (
              <div className="mt-3 p-2 bg-muted rounded text-sm">
                <div className="font-medium">Selected Range:</div>
                <div>
                  {formatDate(dateRange.startDate)} to{" "}
                  {formatDate(dateRange.endDate)}
                </div>
                <div className="text-muted-foreground">
                  {Math.ceil(
                    (dateRange.endDate.getTime() -
                      dateRange.startDate.getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}{" "}
                  days
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
