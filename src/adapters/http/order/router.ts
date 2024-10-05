import { listOrder, listOrders } from "./listing"
import { ServerRoute } from "@hapi/hapi";


const orderRoutes: ServerRoute[] = [
    {
        method: "GET",
        path: "/orders/{id}",
        handler: listOrder
    },
    {
        method: "GET",
        path: "/orders",
        handler: listOrders
    },
    {
        method: "POST",
        path: "/orders",
        handler: (r,h) => {return}
    },
    {   
        method: "PUT",
        path: "/orders/{id}",
        handler: (r,h)=>{return}
    },
    {
        method: "DELETE",
        path: "/orders/{id}",
        handler: (r,h)=>{return}
    }
]

export default orderRoutes