import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class LikesCommentsService {

    constructor(
        @InjectRepository(Like)
        private likeRepository: Repository<Like>,

        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) {}

    // LIKE METHODS
    async createLike(data: CreateLikeDto) {
        const like = this.likeRepository.create(data);
        return await this.likeRepository.save(like);
    }

    async findAllLikes() {
        return await this.likeRepository.find();
    }

    async findLikeById(id: number) {
        return await this.likeRepository.findOne({ where: { id } });
    }

    async updateLike(id: number, data: UpdateLikeDto) {
        await this.likeRepository.update(id, data);
        return await this.likeRepository.findOne({ where: { id } });
    }

    async removeLike(id: number) {
        return await this.likeRepository.delete(id);
    }

    async findLikesByPhoto(photo_id: string) {
        return await this.likeRepository.find({ where: { photo_id } });
    }

    async findLikesByUser(user_id: string) {
        return await this.likeRepository.find({ where: { user_id } });
    }

    // COMMENT METHODS
    async createComment(data: CreateCommentDto) {
        const comment = this.commentRepository.create(data);
        return await this.commentRepository.save(comment);
    }

    async findAllComments() {
        return await this.commentRepository.find();
    }

    async findCommentById(id: number) {
        return await this.commentRepository.findOne({ where: { id } });
    }

    async updateComment(id: number, data: UpdateCommentDto) {
        await this.commentRepository.update(id, data);
        return await this.commentRepository.findOne({ where: { id } });
    }

    async removeComment(id: number) {
        return await this.commentRepository.delete(id);
    }

    async findCommentsByPhoto(photo_id: string) {
        return await this.commentRepository.find({ where: { photo_id } });
    }

    async findCommentsByUser(user_id: string) {
        return await this.commentRepository.find({ where: { user_id } });
    }
}
