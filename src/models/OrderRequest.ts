import Order from "./Order";
import OrderProduct from "./OrderProduct";

export default class OrderRequest {
    order: Order
    orderProducts : OrderProduct[]

    constructor(
        order: Order,
        orderProducts: OrderProduct[]
    ) {
        this.order = order
        this.orderProducts = orderProducts
    }
}