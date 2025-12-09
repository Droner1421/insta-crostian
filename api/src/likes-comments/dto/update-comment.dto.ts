import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { EstadoComment } from "../entities/comment.entity";

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    user_id: string;

    @IsOptional()
    @IsString()
    photo_id: string;

    @IsOptional()
    @IsString()
    comentario: string;

    @IsOptional()
    @IsEnum(EstadoComment)
    estado: EstadoComment;
}
