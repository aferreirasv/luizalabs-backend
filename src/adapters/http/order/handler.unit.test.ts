import { OrderService } from "./interfaces"
import OrderHandler from "./handler"
import Server from "../server"

const mockOrder = {
    'id': '6706d7bd2a51ec575894fb49',
    'customer': 'Alan Ferreira',
    'status': "PENDENTE",
    'date': '2024-10-09T19:21:33.400Z',
    'cart': [
        {
            'name': 'Ventilador turbo 5 velocidades',
            'price': 10,
            'amount': 1
        },
        {
            'name': 'Aspirador de pó vertical e portátil',
            'price': 20,
            'amount': 2
        }
    ],
    'shipping': 30,
    'subtotal': 50,
    'total': 80
}

const mockOrderService = (mockFn?: any) => ({
    createOrder: jest.fn(mockFn),
    listOrders: jest.fn(mockFn),
    getOrder: jest.fn(mockFn),
    deleteOrder: jest.fn(mockFn),
    putOrder: jest.fn(mockFn),
})

describe('OrdersHandler', () => {

    describe('getOrder', () => {
        
        it('should return a order successfully with status 200', async () => {
            const service = mockOrderService(() => mockOrder)
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'GET',
                url: `/orders/${mockOrder.id}`,
            })
            expect(res.statusCode).toBe(200)
            if (res&&res.payload) {
                const data = JSON.parse(res.payload)
                expect(data.id).toBe(mockOrder.id)
                expect(data.customer).toBe('Alan Ferreira')
                expect(data.status).toBe("PENDENTE")
                expect(data.date).toBe('2024-10-09T19:21:33.400Z')
                expect(data.cart).toHaveLength(2)
                expect(data.cart[0].name).toBe('Ventilador turbo 5 velocidades')
                expect(data.cart[0].price).toBe(10)
                expect(data.cart[0].amount).toBe(1)
                expect(data.cart[1].name).toBe('Aspirador de pó vertical e portátil')
                expect(data.cart[1].price).toBe(20)
                expect(data.cart[1].amount).toBe(2)
                expect(data.shipping).toBe(30)
                expect(data.subtotal).toBe(50)
                expect(data.total).toBe(80)
            }
        })

        it('should return 404 not found for no order found', async () => {
            const service = mockOrderService(() => null)
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'GET',
                url: `/orders/${mockOrder.id}`,
            })
            expect(res.statusCode).toBe(404)
        })

        it('should return 500 internal server error for service error', async () => {
            const service = mockOrderService(() => {
                throw new Error('mock error')
            })
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'GET',
                url: `/orders/${mockOrder.id}`,
            })
            expect(res.statusCode).toBe(500)
        })
    })

    describe('GET /orders', () => {
        it('should return a list with one order and status code 200 when given no page', async () => {
            const service = mockOrderService(() => mockOrder)
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'GET',
                url: `/orders`,
            })
            expect(res.statusCode).toBe(200)
            if (res&&res.payload) {
                const data = JSON.parse(res.payload)[0]
                expect(data.id).toBe(mockOrder.id)
                expect(data.customer).toBe('Alan Ferreira')
                expect(data.status).toBe("PENDENTE")
                expect(data.date).toBe('2024-10-09T19:21:33.400Z')
                expect(data.cart).toHaveLength(2)
                expect(data.cart[0].name).toBe('Ventilador turbo 5 velocidades')
                expect(data.cart[0].price).toBe(10)
                expect(data.cart[0].amount).toBe(1)
                expect(data.cart[1].name).toBe('Aspirador de pó vertical e portátil')
                expect(data.cart[1].price).toBe(20)
                expect(data.cart[1].amount).toBe(2)
                expect(data.shipping).toBe(30)
                expect(data.subtotal).toBe(50)
                expect(data.total).toBe(80)
            }
        })
        it('should return a list with no orders and status code 204 when content out of range', async () => {
            const service = mockOrderService(() => [])
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'GET',
                url: `/orders?page=2`,
            })
            expect(res.statusCode).toBe(204)
            expect(res.payload).toHaveLength(0)
        })
    })
    describe('POST /orders', () => {

        it('should create order successfully when given full order', async () => {
            const service = mockOrderService(() => createPayload)
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const {id: _, ... createPayload} = mockOrder
            const res = await server.app.inject({
                method: 'POST',
                url: '/orders',
                payload: createPayload
            })
            expect(res.statusCode).toBe(201)
            if (res&&res.payload) {
                const data = JSON.parse(res.payload)
                expect(data.id).not.toBeNull()
                expect(data.customer).toBe('Alan Ferreira')
                expect(data.status).toBe("PENDENTE")
                expect(data.date).toBe('2024-10-09T19:21:33.400Z')
                expect(data.cart).toHaveLength(2)
                expect(data.cart[0].name).toBe('Ventilador turbo 5 velocidades')
                expect(data.cart[0].price).toBe(10)
                expect(data.cart[0].amount).toBe(1)
                expect(data.cart[1].name).toBe('Aspirador de pó vertical e portátil')
                expect(data.cart[1].price).toBe(20)
                expect(data.cart[1].amount).toBe(2)
                expect(data.shipping).toBe(30)
                expect(data.subtotal).toBe(50)
                expect(data.total).toBe(80)
            }
        })

        it('should create order successfully when given partial order', async () => {
            const service = mockOrderService(() => createPayload)
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const {id,subtotal,total,date,status, ...createPayload} = mockOrder
            const res = await server.app.inject({
                method: 'POST',
                url: '/orders',
                payload: createPayload
            })
            expect(res.statusCode).toBe(201)
            if (res&&res.payload) {
                const data = JSON.parse(res.payload)
                expect(data.id).not.toBeNull()
                expect(data.customer).toBe('Alan Ferreira')
                expect(data.status).toBe("PENDENTE")
                expect(data.date).not.toBeNull()
                expect(data.cart).toHaveLength(2)
                expect(data.cart[0].name).toBe('Ventilador turbo 5 velocidades')
                expect(data.cart[0].price).toBe(10)
                expect(data.cart[0].amount).toBe(1)
                expect(data.cart[1].name).toBe('Aspirador de pó vertical e portátil')
                expect(data.cart[1].price).toBe(20)
                expect(data.cart[1].amount).toBe(2)
                expect(data.shipping).toBe(30)
                expect(data.subtotal).toBe(50)
                expect(data.total).toBe(80)
            }
        })

        it('should not create any order and return code 400 when payload is not valid', async() => {
            const service = mockOrderService(() => createPayload)
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const {id,subtotal,total,shipping,customer, ...createPayload} = mockOrder
            const res = await server.app.inject({
                method: 'POST',
                url: '/orders',
                payload: createPayload
            })
            expect(res.statusCode).toBe(400)
        })
    })

    describe('PUT /orders/{id}', () => {
        it('should update an order when given its id', async () => {
            const service = mockOrderService()
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'PUT',
                url: `/orders/${mockOrder.id}`,
                payload: mockOrder
            })
            expect(res.statusCode).toBe(200)
            if (res&&res.payload) {
                const data = JSON.parse(res.payload)
                expect(data.id).not.toBeNull()
                expect(data.customer).toBe('Alan Ferreira')
                expect(data.status).toBe("PENDENTE")
                expect(data.date).toBe('2024-10-09T19:21:33.400Z')
                expect(data.cart).toHaveLength(2)
                expect(data.cart[0].name).toBe('Ventilador turbo 5 velocidades')
                expect(data.cart[0].price).toBe(10)
                expect(data.cart[0].amount).toBe(1)
                expect(data.cart[1].name).toBe('Aspirador de pó vertical e portátil')
                expect(data.cart[1].price).toBe(20)
                expect(data.cart[1].amount).toBe(2)
                expect(data.shipping).toBe(30)
                expect(data.subtotal).toBe(50)
                expect(data.total).toBe(80)
            }
        })


        it('should not update order and return code 400 when payload is not valid', async() => {
            const service = mockOrderService()
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const {id,shipping,customer, ...updatePayload} = mockOrder

            const res = await server.app.inject({
                method: 'PUT',
                url: `/orders/${mockOrder.id}`,
                payload: updatePayload
            })
            expect(res.statusCode).toBe(400)
        })

        it('should return 404 when order is not found', async() => {
            const service = mockOrderService()
            const handler = new OrderHandler(service as any)
            const server = new Server(handler)
            const res = await server.app.inject({
                method: 'PUT',
                url: `/orders/123456`,
                payload: mockOrder
            })
            expect(res.statusCode).toBe(404)
        })
    })

})