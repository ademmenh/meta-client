import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class EmptyDto {
  @Expose()
  @ApiProperty({ example: 200 })
  statusCode: number;

  @Expose()
  @ApiProperty({ example: 'Request successful' })
  message: string;
}