import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

async function main() {

    await prisma.order.create({
        data: {
          id: '1',
          customer: 'Alan Ferreira',
          status: 'pendente',
          date: '2024-10-07',
          cart: [
            {
                name: 'Aspirador de Pó Vertical e Portátil',
                price: 180.90,
                amount: 3
            },
            {
                name: 'Ventilador Turbo 5 Velocidades',
                price: 499.90,
                amount: 1
            }
          ],
          subtotal: 1042.60,
          shipping: 40,
          total: 1082.60
        },
      })


    const orders = await prisma.order.findMany()
    console.log(orders)
}

main()
    .catch(
    async(e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })