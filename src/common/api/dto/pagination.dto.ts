import { IsInt, IsOptional, IsNumber, Max, Min, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'The cursor for the next page' })
  after?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'The cursor for the previous page' })
  before?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty({ required: false, default: 25, description: 'The number of items to return' })
  limit?: number
}