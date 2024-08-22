import { PaginationResponseDto } from './pagination.response.dto';

export interface PaginationOffset {
  limit: number;
  offset: number;
  pageNr: number;
}

/**
 * @description Create pagination offset
 * @param {number} pageNumber
 * @param {number} perPage
 * @return {PaginationOffset}
 */
export function getPaginateOffset(
  pageNumber: number,
  perPage: number,
): PaginationOffset {
  const pageNr = pageNumber ? Number(pageNumber) : 1;
  const limit = perPage ? Number(perPage) : 10;
  const offset = (pageNr - 1) * limit;
  return { limit, offset, pageNr };
}

/**
 * @description Create response with pagination key value
 * @param {number} totalRecord
 * @param {number} pageNumber
 * @param {number} perPage
 * @param {any} data
 * @return {PaginationInterface<[]>}
 */
export function createPagination<T>(
  totalRecord: number,
  pageNumber: number,
  perPage: number,
  data: T[],
): PaginationResponseDto<T[]> {
  let remainingCount = totalRecord - ((pageNumber - 1) * perPage + data.length);
  remainingCount = remainingCount > 0 ? remainingCount : 0;
  const totalPages = Math.ceil(totalRecord / perPage);
  return {
    pagination_meta: {
      total: totalRecord,
      perPage: Number(perPage),
      currentPage: Number(pageNumber),
      totalPages,
      nextPage: remainingCount ? +pageNumber + 1 : 0,
      remainingCount,
    },
    data,
  };
}
