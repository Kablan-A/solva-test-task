/**
 * This function generates an array of page numbers to be displayed in a pagination component.
 * It calculates the visible page numbers based on the current page and total pages.
 *
 * @example
 * const currentPage = 9;
 * const totalPages = 10;
 * const visiblePageNumbers = getPageNumbers(currentPage, totalPages);
 * console.log(visiblePageNumbers); // Output: [6, 7, 8, 9, 10]
 */
export function getPageNumbers(currPage: number, totalPages: number): number[] {
  const pageNumbers: number[] = [];
  // Calculate start and end page numbers
  // Start must be > 0
  let startPage = Math.max(1, currPage - 2);
  // End must be <= total pages
  let endPage = Math.min(totalPages, startPage + 4);

  // Adjust start if we're near the end
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
