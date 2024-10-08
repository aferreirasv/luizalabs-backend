import { Prisma, PrismaClient } from '@prisma/client'
import Order from '../../domain/order'

export default class Client {

    prisma: PrismaClient = new PrismaClient()
    
    async getOrder() : Promise<Order | null> {


        return this.prisma.order.findFirst().then(
            res => {
                if (res == null) {
                    return null
                }
                return new Order(res.customer,res.status,res.cart, res.shipping,res.id,res.date)
            }
        )
    }

    async createOrder(order: Order): Promise<Order> {
        try{
            const res = await this.prisma.order.create({data: order as Prisma.OrderCreateInput})
            console.log("src/adapters/data/db:24",res)
            return res as Order
        } catch(e: any) {
            return e
        }
    }

    async listOrders(): Promise<Order[]> {

        return new Array<Order>()
    }

}
