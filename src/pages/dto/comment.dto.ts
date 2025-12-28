import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @IsString()
    @ApiProperty({ example: 'This is a comment' })
    message: string;
}

export class CommentDto {
    @Expose()
    @ApiProperty({ example: '1234567890_1234567890' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Great post!' })
    message: string;

    @Expose()
    @ApiProperty({ required: false })
    from?: {
        id: string;
        name: string;
    };

    @Expose()
    @ApiProperty({ example: '2023-01-01T12:00:00+0000' })
    created_time: string;
}

export class CommentListResponseDto {
    @Expose()
    @ApiProperty({ type: [CommentDto] })
    data: CommentDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
}

export class CreateCommentResponseDto {
    @Expose()
    @ApiProperty({ example: '1234567890_1234567890' })
    id: string;
}

export class DeleteCommentResponseDto {
    @Expose()
    @ApiProperty({ example: true })
    success: boolean;
}
