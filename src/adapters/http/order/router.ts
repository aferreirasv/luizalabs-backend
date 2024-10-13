import OrderHandler from './handler'
import { ServerRoute } from '@hapi/hapi'

export default class OrederRouter {

    getRoutes(handler: OrderHandler) : ServerRoute[] { 
        return [
            {
                method: 'GET',
                path: '/orders/{id}',
                handler: handler.getOrder.bind(handler)
            },
            {
                method: 'GET',
                path: '/orders',
                handler: handler.listOrders.bind(handler)
            },
            {
                method: 'POST',
                path: '/orders',
                handler: handler.createOrder.bind(handler)
            },
            {   
                method: 'PUT',
                path: '/orders/{id}',
                handler: handler.putOrder.bind(handler)
            },
            {
                method: 'DELETE',
                path: '/orders/{id}',
                handler: handler.deleteOrder.bind(handler)
            }
        ]
    }
}