import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export function SuccessDtoF(model: any) {
    const name = `${model.name}ResponseDto`;
    class SuccessDto {
        @ApiProperty({ example: 200 })
        statusCode: number;

        @ApiProperty({ example: 'Request Successful' })
        message: string;

        @ApiProperty({ type: model })
        @Type(() => model)
        data: any;
    }
    Object.defineProperty(SuccessDto, 'name', { value: name });
    return SuccessDto;
}
