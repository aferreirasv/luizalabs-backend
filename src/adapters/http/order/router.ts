import OrderHandler from './handler'
import { ServerRoute } from '@hapi/hapi'

export default class OrderRouter {

    getRoutes(handler: OrderHandler) : ServerRoute[] { 
        return [
            {
                method: 'GET',
                path: '/orders/{id}',
                handler: handler.getOrder.bind(handler),
                options: {
                    tags: ['order'],
                 }
            },
            {
                method: 'GET',
                path: '/orders',
                handler: handler.listOrders.bind(handler)
            },
            {
                method: 'POST',
                path: '/orders',
                handler: handler.createOrder.bind(handler),
                options: {
                    tags: ['order'],
                }
            },
            {   
                method: 'PUT',
                path: '/orders/{id}',
                handler: handler.putOrder.bind(handler),
                options: {
                    tags: ['order'],
                }
            },
            {
                method: 'DELETE',
                path: '/orders/{id}',
                handler: handler.deleteOrder.bind(handler),
                options: {
                    tags: ['order'],
                }
            }
        ]
    }
}