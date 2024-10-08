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
}