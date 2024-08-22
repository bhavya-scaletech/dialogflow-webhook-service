import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaData {
  @ApiProperty({ description: 'Total number of items' })
  total!: number;

  @ApiProperty({ description: 'Number of items per page' })
  perPage!: number;

  @ApiProperty({ description: 'Current page number' })
  currentPage!: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages!: number;

  @ApiProperty({ description: 'Next page number if exists' })
  nextPage!: number;

  @ApiProperty({ description: 'Number of remaining items' })
  remainingCount!: number;
}

/**
 * @description Pagination Response DTO
 */
export class PaginationResponseDto<T> {
  @ApiProperty({ description: 'Data payload' })
  data!: T;

  @ApiProperty({ description: 'Pagination meta data' })
  pagination_meta!: PaginationMetaData;

  constructor(data: T, meta: PaginationMetaData) {
    this.data = data;
    this.pagination_meta = meta;
  }
}
