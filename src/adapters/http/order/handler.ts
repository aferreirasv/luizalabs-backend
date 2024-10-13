import { Request, ResponseToolkit,ResponseObject } from '@hapi/hapi';
import {Order} from '../../../domain/order/interfaces'
import { PutOrderResponse, GetOrderResponse, ListOrdersResponse, PostOrderResponse } from './response';
import OrderService from '../../../domain/order/service';
import { createOrderSchema, putOrderSchema } from './validator'


export default class OrderHandler {

    service: OrderService

    constructor(service: OrderService) {
        this.service = service
    }

    async getOrder(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        const res = await this.service.getOrder(request.params.id)
        if(res == null){
            return h.response('Order not found').code(404)
        }
        return h.response(<GetOrderResponse>res)
    }
    

    async listOrders(request: Request,h: ResponseToolkit): Promise<ResponseObject> {
        const page = parseInt(request.query.page)
        const amount = parseInt(request.query.amount) || 3
        const res = await this.service.listOrders(page,amount)
        if(res.orders == null) {
            return h.response('No orders were found').code(404)
        }
        return h.response(<ListOrdersResponse[]>res.orders).header('Content-Range', `${(page - 1)*amount}-${page*amount - 1}/${res.count} `)
    }
    

    async createOrder(request: Request, h:ResponseToolkit): Promise<ResponseObject> {
        const { value, error } = createOrderSchema.validate(request.payload)
        if (error) {
            return h.response({message: error.message}).code(400)
        }

        const order: Order = <Order>value
        try {
            const res = await this.service.createOrder(order)
            return h.response(<PostOrderResponse>res)
        } catch (e: any) {
            console.error(e.message)
            return h.response('Internal server error').code(500)
        }
    }
    

    async deleteOrder(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        try {
            const order = await this.service.deleteOrder(request.params.id)
            return h.response(order)
        }
        catch(e: any) {
            return h.response('Order was not found').code(404)
        }
    }
    

    async putOrder(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        const { value, error } = putOrderSchema.validate(request.payload)
        if (error) {
            return h.response({message: error.message}).code(400)
        }

        try {
            const order: Order = <Order>value
            const res = await this.service.putOrder(order)
            return h.response(<PutOrderResponse>res)
        } catch (e: any) {
            console.error(e)
            return h.response('Internal server error').code(500)
        }
    }

}
