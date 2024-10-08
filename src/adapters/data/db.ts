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
                return new Order(res.id, res.customer, res.status, res.date, res.cart, res.subtotal, res.shipping, res.total)
            }
        )
    }

    async createOrder(order: Order): Promise<Order> {
        return order
    }

    async listOrders(): Promise<Order[]> {

        return new Array<Order>()
    }

}


    // await prisma.order.create({
    //     data: {
    //       id: '1',
    //       customer: 'Alan Ferreira',
    //       status: 'pendente',
    //       date: '2024-10-07',
    //       cart: [
    //         {
    //             name: 'Aspirador de Pó Vertical e Portátil',
    //             price: 180.90,
    //             amount: 3
    //         },
    //         {
    //             name: 'Ventilador Turbo 5 Velocidades',
    //             price: 499.90,
    //             amount: 1
    //         }
    //       ],
    //       subtotal: 1042.60,
    //       shipping: 40,
    //       total: 1082.60
    //     },
    //   })