"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  PAGE_DISPLAY_LIMIT: number;
};

const RestaurantDetailPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  PAGE_DISPLAY_LIMIT,
}: Props) => {
  const getDisplayedPages = () => {
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(PAGE_DISPLAY_LIMIT / 2),
        totalPages - PAGE_DISPLAY_LIMIT + 1
      )
    );
    const endPage = Math.min(totalPages, startPage + PAGE_DISPLAY_LIMIT - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <ChevronLeft
        className={`transition-all duration-300 ${
          currentPage === 1 ? "opacity-0" : "opacity-100 cursor-pointer"
        }`}
        onClick={handlePreviousPage}
      />
      {getDisplayedPages().map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? "default" : "outline"}
        >
          {page}
        </Button>
      ))}
      <ChevronRight
        className={`transition-all duration-300 ${
          currentPage === totalPages
            ? "opacity-0"
            : "opacity-100 cursor-pointer"
        }`}
        onClick={handleNextPage}
      />
    </div>
  );
};

export default RestaurantDetailPagination;
