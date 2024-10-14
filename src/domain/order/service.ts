import {Order, Product, Orders, Pricing} from './interfaces'
import OrderRepository from './repository'

export default class OrderService {
    
    repository: OrderRepository

    constructor(orderRepository: OrderRepository) {
        this.repository = orderRepository
    }

    getOrder(id: string): Promise<Order | null>  {
        return this.repository.getOrder(id)
    }
    
    
    listOrders(page: number, amount: number = 3): Promise<Orders> {
        return this.repository.listOrders(page, amount)
    }
    
    createOrder(order: Order): Promise<Order> {
        try {
            this.checkPrices(order)
            return this.repository.createOrder(order)
        } catch(e: any) {
            throw e
        }
    }
    
    deleteOrder(id: string): Promise<Order> {
        return this.repository.deleteOrder(id)
    }
    
    putOrder(order: Order) : Promise<Order>  {
        try {
            this.checkPrices(order)
            return this.repository.putOrder(order)
        } catch(e: any) {
            throw e
        }
    }

    getPrices(order: Order): Pricing {
        let subtotal = parseFloat(order.cart.reduce((acc: number, product: Product) => {
            acc += product.price * product.amount
            return acc
        }, 0).toFixed(2))
        let total = parseFloat((subtotal + order.shipping).toFixed(2))
        let pricing: Pricing = {subtotal: subtotal, total: total}
        return pricing
    }
    
    checkPrices(order: Order) {
        const prices = this.getPrices(order)
        if(!order.subtotal && !order.total) {
            this.setPrices(order,prices)
        }
        if (order.subtotal != prices.subtotal || order.total != prices.total) {
            throw new Error('Order pricing is inconsistent.')
        }
        this.setPrices(order,<Pricing>order)
    }
    
    setPrices(order: Order, prices: Pricing) {
        order.total = prices.total
        order.subtotal = prices.subtotal
    }
    
}

