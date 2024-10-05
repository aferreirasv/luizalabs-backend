import {Request, ResponseToolkit,ResponseObject} from '@hapi/hapi'

export async function listOrders(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    
    return h.response("Listing all orders")

}

export async function listOrder(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    const order = request.params.id
    return h.response("Listing only order " + order)
}


