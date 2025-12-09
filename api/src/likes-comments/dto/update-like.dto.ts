import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { EstadoLike } from "../entities/like.entity";

export class UpdateLikeDto {
    @IsOptional()
    @IsString()
    user_id: string;

    @IsOptional()
    @IsString()
    photo_id: string;

    @IsOptional()
    @IsEnum(EstadoLike)
    estado: EstadoLike;
}
