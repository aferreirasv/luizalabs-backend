import { ServerRoute,Request, ResponseToolkit,ResponseObject } from "@hapi/hapi";
import Service from '../../../domain/service'
import OrderHandler from './handler'
import Order from '../../../domain/order'
import { Server } from "http";

export default class OrderRouter{

    static getRoutes(handler: OrderHandler): ServerRoute[] {
        return [
            {
                method: "GET",
                path: "/",
                handler: (r,h)=> (h.response("Application is healthy"))
            },
            {
                method: "GET",
                path: "/orders/{id}",
                handler: handler.getOrder.bind(handler)
            },
            {
                method: "GET",
                path: "/orders",
                handler: handler.listOrders.bind(handler)
            },
            {
                method: "POST",
                path: "/orders",
                handler: handler.createOrder.bind(handler)
            },
            // {   
            //     method: "PUT",
            //     path: "/orders/{id}",
            //     handler: (r,h)=>{return}
            // },
            // {
            //     method: "DELETE",
            //     path: "/orders/{id}",
            //     handler: (r,h)=>{return}
            // }
        ]
    }
}