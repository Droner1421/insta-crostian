import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { EstadoLike } from "../entities/like.entity";

export class CreateLikeDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    photo_id: string;

    @IsOptional()
    @IsEnum(EstadoLike)
    estado: EstadoLike;
}
