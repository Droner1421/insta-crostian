import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { EstadoComment } from "../entities/comment.entity";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    photo_id: string;

    @IsNotEmpty()
    @IsString()
    comentario: string;

    @IsOptional()
    @IsEnum(EstadoComment)
    estado: EstadoComment;
}
