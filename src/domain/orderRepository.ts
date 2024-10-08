import Order from './order'

interface OrderRepository {
    createOrder(order: Order): Promise<Order>
    listOrders(): Promise<Order[]>
    getOrder(id: string) : Promise<Order | null>
}

export default OrderRepository