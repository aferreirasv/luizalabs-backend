import Order from './order'
import OrderPage from './orderPage'

interface OrderRepository {
    createOrder(order: Order): Promise<Order>
    listOrders(page: number, amount: number): Promise<OrderPage>
    getOrder(id: string) : Promise<Order | null>
}

export default OrderRepository