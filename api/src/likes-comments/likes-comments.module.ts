import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesCommentsService } from './likes-comments.service';
import { LikesCommentsController } from './likes-comments.controller';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Like, Comment]),
    ],
    controllers: [LikesCommentsController],
    providers: [LikesCommentsService],
})
export class LikesCommentsModule {}
