export type OrderSQL = {
    id: string;
    items: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}
export type OrderSchema = {
    id: string;
    items: any[];
    status: number;
    created_at: Date;
    updated_at: Date;
}