import { Prisma, PrismaClient } from '@prisma/client'
import {Order,Orders} from '../../domain/order/interfaces'

export default class DBClient {
    
    prisma: PrismaClient
    
    constructor() {
        this.prisma = new PrismaClient()
    }

    async getOrder(id: string) : Promise<Order | null> {
        try{
            
            const res = await this.prisma.order.findUnique({
                where: {id: id}
            })
            return res as Order
        }
        catch(e: any) {
            return e
        }
    }
    
    async createOrder(order: Order): Promise<Order> {
        try{
            const res = await this.prisma.order.create({data: order as Prisma.OrderCreateInput})
            return res as Order
        } catch(e: any) {
            return e
        }
    }
    
    async listOrders(page: number, amount: number): Promise<Orders> {
        try {
            const [orders, count] = await this.prisma.$transaction([
                this.prisma.order.findMany({
                    skip: ((page - 1) * amount), 
                    take: amount
                }),
                this.prisma.order.count()
            ]);
            
            return <Orders>({
                count: count,
                orders: orders.map((order: any) =>  <Order>order)
            }
        )
    } catch (e: any) {
        console.error(e)
        return e
    }
    }

    async deleteOrder(order: string): Promise<Order> {
        try {
            const res = await this.prisma.order.delete({ where: { id: order } })
            return res as unknown as Order
        }
        catch(e: any) {
            console.error(e)
            return e
        }
    }

    async putOrder(order: Order) : Promise<Order>{ 
        try{
            const {['id']: _,...payload} = order
            const res = await this.prisma.order.update({where: {id: order.id}, data: payload})
            return res as Order
        } catch(e: any) {
            return e
        }
    }
}