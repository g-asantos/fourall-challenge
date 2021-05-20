import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('movies')
class Movie {
    @PrimaryColumn()
    id?: string;

    @Column()
    title: string;

    @Column()
    director: string;

    @Column()
    rented: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Movie };
