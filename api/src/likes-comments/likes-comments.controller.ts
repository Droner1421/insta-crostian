import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { LikesCommentsService } from './likes-comments.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('likes-comments')
export class LikesCommentsController {

    constructor(private readonly likesCommentsService: LikesCommentsService) {}

    // LIKE ENDPOINTS
    @Post('likes')
    createLike(@Body(ValidationPipe) data: CreateLikeDto) {
        return this.likesCommentsService.createLike(data);
    }

    @Get('likes')
    findAllLikes() {
        return this.likesCommentsService.findAllLikes();
    }

    @Get('likes/:id')
    findLikeById(@Param('id') id: string) {
        return this.likesCommentsService.findLikeById(+id);
    }

    @Get('likes/photo/:photo_id')
    findLikesByPhoto(@Param('photo_id') photo_id: string) {
        return this.likesCommentsService.findLikesByPhoto(photo_id);
    }

    @Get('likes/user/:user_id')
    findLikesByUser(@Param('user_id') user_id: string) {
        return this.likesCommentsService.findLikesByUser(user_id);
    }

    @Patch('likes/:id')
    updateLike(@Param('id') id: string, @Body(ValidationPipe) data: UpdateLikeDto) {
        return this.likesCommentsService.updateLike(+id, data);
    }

    @Delete('likes/:id')
    removeLike(@Param('id') id: string) {
        return this.likesCommentsService.removeLike(+id);
    }

    // COMMENT ENDPOINTS
    @Post('comments')
    createComment(@Body(ValidationPipe) data: CreateCommentDto) {
        return this.likesCommentsService.createComment(data);
    }

    @Get('comments')
    findAllComments() {
        return this.likesCommentsService.findAllComments();
    }

    @Get('comments/:id')
    findCommentById(@Param('id') id: string) {
        return this.likesCommentsService.findCommentById(+id);
    }

    @Get('comments/photo/:photo_id')
    findCommentsByPhoto(@Param('photo_id') photo_id: string) {
        return this.likesCommentsService.findCommentsByPhoto(photo_id);
    }

    @Get('comments/user/:user_id')
    findCommentsByUser(@Param('user_id') user_id: string) {
        return this.likesCommentsService.findCommentsByUser(user_id);
    }

    @Patch('comments/:id')
    updateComment(@Param('id') id: string, @Body(ValidationPipe) data: UpdateCommentDto) {
        return this.likesCommentsService.updateComment(+id, data);
    }

    @Delete('comments/:id')
    removeComment(@Param('id') id: string) {
        return this.likesCommentsService.removeComment(+id);
    }
}
