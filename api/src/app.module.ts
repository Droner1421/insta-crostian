import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LikesCommentsModule } from './likes-comments/likes-comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './likes-comments/entities/like.entity';
import { Comment } from './likes-comments/entities/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'instagram',
            entities: [Like, Comment],
            synchronize: true,
        }),
        
        LikesCommentsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
