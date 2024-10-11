import { Prisma, PrismaClient } from '@prisma/client'
import Order from '../../domain/order'
import OrderPage from '../../domain/orderPage'

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
            return res as Order
        } catch(e: any) {
            return e
        }
    }

    async listOrders(page: number, amount: number): Promise<OrderPage> {
        try {
            const [orders, count] = await this.prisma.$transaction([
                this.prisma.order.findMany({
                    skip: ((page - 1) * amount), 
                    take: amount
                }),
                this.prisma.order.count()
              ]);

            return <OrderPage>({
                count: count,
                orders: orders.map(order => new Order(order.customer, order.status, order.cart,order.shipping, order.id, order.date))
            }
            )
        } catch (e: any) {
            console.error(e)
            return e
        }
    }

}
