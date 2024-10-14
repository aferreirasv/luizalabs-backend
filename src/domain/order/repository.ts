import {Order, Orders} from './interfaces'

interface OrderRepository {
    createOrder(order : Order) : Promise<Order>
    listOrders(page : number, amount: number) : Promise<Orders>
    getOrder(id : string) : Promise<Order | null>
    deleteOrder(id : string) : Promise<Order>
    putOrder(order : Order) : Promise<Order>
}

export default OrderRepository