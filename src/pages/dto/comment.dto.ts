import { IsString } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    message: string;
}

export class CommentDto {
    id: string;
    message: string;
    from?: {
        id: string;
        name: string;
    };
    created_time: string;
}

export class CommentListResponseDto {
    data: CommentDto[];
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
    id: string;
}

export class DeleteCommentResponseDto {
    success: boolean;
}
