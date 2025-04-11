import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
}

export const Pagg = ({ page, setPage, totalPages }: PaginationProps) => {
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (totalPages > page) {
      setPage(page + 1);
    }
  };
  const handlePage = (p: number) => {
    setPage(p);
  };
  const pagesToShow = [page - 1, page, page + 1].filter(
    (p) => p > 1 && p < totalPages
  );

  return (
    <div className="lg:w-[1280px] lg:h-[40px] mt-[20px] mb-[20px] flex justify-end w-[350px]">
      <div className="lg:h-[40px]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrev} />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink onClick={() => handlePage(1)}>1</PaginationLink>
            </PaginationItem>

            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis
                  className={`${page > 3 ? "flex" : "hidden"}`}
                />
              </PaginationItem>
            )}
            {pagesToShow.map((item, index) => (
              <PaginationItem
                key={index}
                className={`w-10 h-10 hover:border hover:border-black rounded-2xl flex items-center justify-center ${
                  item === page ? "bg-black text-white" : ""
                }`}
                onClick={() => setPage(item)}
              >
                {item}
              </PaginationItem>
            ))}
            {page < totalPages && (
              <PaginationItem>
                <PaginationEllipsis
                  className={`${page < totalPages ? "hidden" : "flex"}`}
                />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => handlePage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
