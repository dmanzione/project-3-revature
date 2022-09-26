import Order from "../../models/Order"
import OrderRequest from "../../models/OrderRequest"

function OrderBox(props:OrderRequest) {

    return (
        <div>
            <p>Total: ${props.order.total}</p>
            
            <ul>
                {props.orderProducts.map((item) => (
                    <li key={item.id}>${item.product.price} {item.product.name} x {item.quantity} = ${item.subtotal}
                        
                        </li>
                ))}
            
            </ul>
        </div>
    )
}

export default OrderBox