import Order from './order'
import OrderPage from './orderPage'
import OrderRepository from './orderRepository'

export default class Service {
    orderRepository : OrderRepository

    constructor(orderRepository : OrderRepository) {
        this.orderRepository = orderRepository
    }
    getOrder(id: string): Promise<Order | null> {

        return this.orderRepository.getOrder(id)
    }

    listOrders(page: number, amount: number = 3): Promise<OrderPage> {
        return this.orderRepository.listOrders(page, amount)
    }

    createOrder(order: Order): Promise<Order> | Error {
        try {

            if (this.validateOrder(order)) {
                return this.orderRepository.createOrder(order)
            } else {
                return new Error("Order is not valid.")
            }
        } catch(e: any) {
            return e
        }
    }

    validateOrder(order: Order): boolean {
        console.log(order)
        if (
            order.customer && 
            order.status &&
            order.cart.length > 0 &&
            order.subtotal &&
            order.total
        )
            return true 
        return false
    }
}