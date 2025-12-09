import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum EstadoComment {
    activo = "Activo",
    inactivo = "Inactivo",
}

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    user_id: string;

    @Column({ type: 'varchar', length: 255 })
    photo_id: string;

    @Column({ type: 'text' })
    comentario: string;

    @CreateDateColumn()
    fecha: Date;

    @Column({
        type: 'enum',
        enum: EstadoComment,
        default: EstadoComment.activo
    })
    estado: EstadoComment;
}
