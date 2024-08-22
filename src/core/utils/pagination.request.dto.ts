import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

/**
 * @description Pagination Request DTO
 */
export class PaginationRequestDto {
  @ApiPropertyOptional({ default: 1 })
  @Transform((tr) => Number(tr.value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly page!: number;

  @ApiPropertyOptional({ default: 10 })
  @Transform((tr) => Number(tr.value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly per_page!: number;
}
