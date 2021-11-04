import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    timestamps: true,
    underscored: true
})
export class OrderModel extends Model {
    @Column({ primaryKey: true })
    id: string;

    @Column
    items: string;

    @Column
    status: number;

    @Column
    created_at: Date;

    @Column
    updated_at: Date;
}