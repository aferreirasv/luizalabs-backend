import { prisma } from "./db"
import {Order} from '@prisma/client'

export async function selectOrders() : Promise<Order[]> {
    return prisma.order.findMany()
}