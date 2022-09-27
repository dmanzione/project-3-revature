import Product from "./Product"


export default class OrderProduct {
    id: number
    product: Product
    quantity: number
    subtotal: number

    constructor(
        id: number,
        product: Product,
        quantity: number,
        subtotal: number
    ) {
        this.id = id
        this.product = product
        this.quantity = quantity
        this.subtotal = subtotal
    }

}