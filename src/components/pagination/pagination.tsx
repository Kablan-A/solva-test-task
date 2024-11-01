import { getPageNumbers } from "../../util/get-page-numbers";
import { PageItem } from "./page-item";

export interface PaginationProps {
  currPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export function Pagination({
  currPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const hasNextPage = currPage < totalPages;
  const hasPrevPage = currPage > 1;
  const pageNums = getPageNumbers(currPage, totalPages);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <PageItem
          disabled={!hasPrevPage}
          linkText="Previous"
          onClick={() => onPageChange(currPage - 1)}
        />
        {pageNums.map((pageNum) => (
          <PageItem
            key={pageNum}
            active={currPage === pageNum}
            linkText={`${pageNum}`}
            onClick={() => onPageChange(pageNum)}
          />
        ))}
        <PageItem
          disabled={!hasNextPage}
          linkText="Next"
          onClick={() => onPageChange(currPage + 1)}
        />
      </ul>
    </nav>
  );
}
