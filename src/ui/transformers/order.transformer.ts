import { Order } from 'src/domain/entities/order.entities';
import { BaseTransformer } from '../../commons/ui/base.transformer';
import { OrderItem } from '../../domain/value_objects/order/order-item.vo';

export class OrderTransformer extends BaseTransformer {
    public transformList(datas: Order[]): Record<string, any>[] {
        return datas.map((data: Order) => {
            return {
                id: data.getId(),
                status: data.getStatus().getStatusString(),
                createdAt: data.getCreatedAt(),
                updatedAt: data.getUpdatedAt(),
            };
        });
    }

    public transformDetail(data: Order): Record<string, any> {
        if (data) {
            return {
                id: data.getId(),
                items: data.getItems().map((item: OrderItem) => {
                    return {
                        name: item.getName(),
                        qty: item.getQty(),
                        price: item.getPrice(),
                        total: item.getTotal(),
                    }
                }),
                status: data.getStatus().getStatusString(),
                createdAt: data.getCreatedAt(),
                updatedAt: data.getUpdatedAt(),
            }
        }

        return null;
    }
}
