import Order from './order'
import OrderRepository from './orderRepository'

export default class Service {
    orderRepository : OrderRepository

    constructor(orderRepository : OrderRepository) {
        this.orderRepository = orderRepository
    }
    getOrder(id: string): Promise<Order | null> {

        return this.orderRepository.getOrder(id)
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