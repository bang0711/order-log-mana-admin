import { Link } from "next-view-transitions";
import React from "react";
import { Button } from "./ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type Props = {
  totalPages: number;
  currentPage: number;
  path: string;
  query: string | null;
};

function Pagination({ totalPages, currentPage, path, query }: Props) {
  const getVisiblePages = (
    currentPage: number,
    totalPages: number
  ): number[] => {
    let startPage: number, endPage: number;
    // Show only 3 pages at a time
    if (totalPages <= 3) {
      // Less than 3 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than 3 total pages
      if (currentPage <= 2) {
        // Near the beginning; show first 3 pages
        startPage = 1;
        endPage = 3;
      } else if (currentPage + 1 >= totalPages) {
        // Near the end; show last 3 pages
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        // Somewhere in the middle; show current, one before and one after
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="col-span-4 flex w-full select-none items-center gap-2 laptop:col-span-3 desktop:col-span-2">
      {currentPage !== 1 && (
        <Link
          className="text-primary font-bold"
          href={`/${path}?page=${currentPage - 1}${
            query ? `&query=${query}` : ""
          }`}
        >
          <ChevronsLeft />
        </Link>
      )}

      {getVisiblePages(currentPage, totalPages).map((pageNumber) => (
        <Link
          href={`?page=${pageNumber}${query ? `&query=${query}` : ""}`}
          key={pageNumber}
        >
          <Button
            type="button"
            className="font-bold"
            variant={currentPage === pageNumber ? "default" : "outline"}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </Button>
        </Link>
      ))}
      {currentPage !== totalPages && (
        <Link
          className="text-primary font-bold"
          href={`/${path}?page=${currentPage + 1}${
            query ? `&query=${query}` : ""
          }`}
        >
          <ChevronsRight />
        </Link>
      )}
    </div>
  );
}

export default Pagination;
