import { Order, Orders } from '../../../domain/order/interfaces'

export interface OrderService {
    getOrder(id: string): Promise<Order | null>
    listOrders(page: number, amount: number): Promise<Orders>
    createOrder(order: Order): Promise<Order>
    deleteOrder(id: string): Promise<Order> 
    putOrder(order: Order) : Promise<Order>
}