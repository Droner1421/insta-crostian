import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum EstadoLike {
    activo = "Activo",
    inactivo = "Inactivo",
}

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    user_id: string;

    @Column({ type: 'varchar', length: 255 })
    photo_id: string;

    @CreateDateColumn()
    fecha: Date;

    @Column({
        type: 'enum',
        enum: EstadoLike,
        default: EstadoLike.activo
    })
    estado: EstadoLike;
}
