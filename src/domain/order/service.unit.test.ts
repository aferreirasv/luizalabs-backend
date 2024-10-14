import { describe, expect, it } from '@jest/globals';
import Service from './service'
import Status from './status'
import { Order } from './interfaces';
import { mock } from 'node:test';
import { create } from 'domain';

const mockOrder = {
    'id': '6706d7bd2a51ec575894fb49',
    'customer': 'Alan Ferreira',
    'status': Status.PENDENTE,
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

const mockOrderRepository = (mockFn?: any) => ({
    createOrder:    jest.fn(mockFn),
    listOrders: jest.fn(mockFn),
    getOrder: jest.fn(mockFn),
    deleteOrder: jest.fn(mockFn),
    putOrder: jest.fn(mockFn),
})

describe('getOrder', () => {

    it('should return order successfully', async () => {
        const repository = mockOrderRepository(() => mockOrder)
        const service = new Service(repository as any);
        const result = await service.getOrder(mockOrder.id)
        expect(result).not.toBeNull()
        if (result != null) {
            expect(result.id).toBe(mockOrder.id)
            expect(result.customer).toBe('Alan Ferreira')
            expect(result.status).toBe(Status.PENDENTE)
            expect(result.date).toBe('2024-10-09T19:21:33.400Z')
            expect(result.cart).toHaveLength(2)
            expect(result.cart[0].name).toBe('Ventilador turbo 5 velocidades')
            expect(result.cart[0].price).toBe(10)
            expect(result.cart[0].amount).toBe(1)
            expect(result.cart[1].name).toBe('Aspirador de pó vertical e portátil')
            expect(result.cart[1].price).toBe(20)
            expect(result.cart[1].amount).toBe(2)
            expect(result.shipping).toBe(30)
            expect(result.subtotal).toBe(50)
            expect(result.total).toBe(80)
        }
    })

    it('should return null order', async () => {
        const repository = mockOrderRepository(() => null)
        const service = new Service(repository as any);
        const result = await service.getOrder(mockOrder.id)
        expect(result).toBeNull()
    })

    it('should throw repository error', async () => {
        const repository = mockOrderRepository(() => {
            throw new Error('mock error')
        })
        const service = new Service(repository as any);
        try {
            const result = await service.getOrder(mockOrder.id)
        } catch (e: any) {
            expect(e.message).toBe('mock error')
        }
    })
})

describe ('listOrder', () => {
    it('should return list of orders', async () => {
        const config = {page: 1 , amount: 3}
        const mockListConfig = {count: 1, orders: [mockOrder]}
        const repository = mockOrderRepository(() => (mockListConfig))
        const service = new Service(repository as any)
        const result = await service.listOrders(config.page, config.amount)
        const {orders, count} = result
        expect(result).not.toBeNull
        expect(count).toBe(1)
        expect(orders).toHaveLength(1)
        if(result != null){
            expect(orders[0].id).toBe(mockOrder.id)
            expect(orders[0].date).toBe(mockOrder.date)
            expect(orders[0].status).toBe(Status.PENDENTE)
            expect(orders[0].date).toBe('2024-10-09T19:21:33.400Z')
            expect(orders[0].cart).toHaveLength(2)
            expect(orders[0].cart[0].name).toBe('Ventilador turbo 5 velocidades')
            expect(orders[0].cart[0].price).toBe(10)
            expect(orders[0].cart[0].amount).toBe(1)
            expect(orders[0].cart[1].name).toBe('Aspirador de pó vertical e portátil')
            expect(orders[0].cart[1].price).toBe(20)
            expect(orders[0].cart[1].amount).toBe(2)
            expect(orders[0].shipping).toBe(30)
            expect(orders[0].subtotal).toBe(50)
            expect(orders[0].total).toBe(80)
        }
        })
    })
    it('should return empty results', async () => {
        const config = {page: 1 , amount: 3}
        const mockListConfig = {count: 0, orders: []}
        const repository = mockOrderRepository(() => (mockListConfig))
        const service = new Service(repository as any)
        const result = await service.listOrders(config.page, config.amount)
        const {orders, count} = result
        expect( orders).toHaveLength(0)
        expect(count).toBe(0)
    })

    it('should return error', async () => {
        const config = {page: 0 , amount: 3}
        const repository = mockOrderRepository(() => {throw new Error('mock error')})
        const service = new Service(repository as any)
        try {
            const result = await service.listOrders(config.page)
        } catch (e: any) {
            expect(e.message).toBe('mock error')
        }
    })

describe ('createOrder', () => {
    it('sendind a full order should create an order and return it successfully', async() => {
        const repository = mockOrderRepository(() => mockOrder)
        const service = new Service(repository as any);
        const {id: _, ... createModel} = mockOrder
        const result = await service.createOrder(<Order>createModel)
        expect(result).not.toBeNull()
        
        if (result != null) {
            expect(result.id).not.toBeNull()
            expect(result.customer).toBe('Alan Ferreira')
            expect(result.status).toBe(Status.PENDENTE)
            expect(result.date).toBe('2024-10-09T19:21:33.400Z')
            expect(result.cart).toHaveLength(2)
            expect(result.cart[0].name).toBe('Ventilador turbo 5 velocidades')
            expect(result.cart[0].price).toBe(10)
            expect(result.cart[0].amount).toBe(1)
            expect(result.cart[1].name).toBe('Aspirador de pó vertical e portátil')
            expect(result.cart[1].price).toBe(20)
            expect(result.cart[1].amount).toBe(2)
            expect(result.shipping).toBe(30)
            expect(result.subtotal).toBe(50)
            expect(result.total).toBe(80)
        }
    })

    it('sending an order with inconsistent prices should return error', async() => {
        const repository = mockOrderRepository(() => createModel)
        const service = new Service(repository as any);
        const {id: _, ... createModel} = mockOrder
        createModel.total = 579.50
        try {
            const result = await service.createOrder(<Order>createModel)
        } catch (e: any) {
            expect(e.message).toBe('Order pricing is inconsistent.')
        }
    })
})

describe('putOrder', () => {

    it('should update and order and return it successfully', async() => {
        const repository = mockOrderRepository(() => mockOrder)
        const service = new Service(repository as any);
        const result = await service.putOrder(mockOrder)
        expect(result).not.toBeNull()
        
        if (result != null) {
            expect(result.id).not.toBeNull()
            expect(result.customer).toBe('Alan Ferreira')
            expect(result.status).toBe(Status.PENDENTE)
            expect(result.date).toBe('2024-10-09T19:21:33.400Z')
            expect(result.cart).toHaveLength(2)
            expect(result.cart[0].name).toBe('Ventilador turbo 5 velocidades')
            expect(result.cart[0].price).toBe(10)
            expect(result.cart[0].amount).toBe(1)
            expect(result.cart[1].name).toBe('Aspirador de pó vertical e portátil')
            expect(result.cart[1].price).toBe(20)
            expect(result.cart[1].amount).toBe(2)
            expect(result.shipping).toBe(30)
            expect(result.subtotal).toBe(50)
            expect(result.total).toBe(80)
        }
    })

    it('sending an order with inconsistent prices should return error', async() => {
        const repository = mockOrderRepository(() => mockOrder)
        const service = new Service(repository as any);
        const updateModel = { ...mockOrder, total: 200}

        try {
            const result = await service.putOrder(updateModel)
        } catch (e: any) {
            expect(e.message).toBe('Order pricing is inconsistent.')
        }
    })
})

describe('deleteOrder', () => {
    it('should delete and order and return it successfully', async () => {
        const repository = mockOrderRepository(() => mockOrder)
        const service = new Service(repository as any);
        const result = await service.deleteOrder(mockOrder.id)
        expect(result).not.toBeNull()
        if (result != null) {
            expect(result.id).toBe(mockOrder.id)
            expect(result.customer).toBe('Alan Ferreira')
            expect(result.status).toBe(Status.PENDENTE)
            expect(result.date).toBe('2024-10-09T19:21:33.400Z')
            expect(result.cart).toHaveLength(2)
            expect(result.cart[0].name).toBe('Ventilador turbo 5 velocidades')
            expect(result.cart[0].price).toBe(10)
            expect(result.cart[0].amount).toBe(1)
            expect(result.cart[1].name).toBe('Aspirador de pó vertical e portátil')
            expect(result.cart[1].price).toBe(20)
            expect(result.cart[1].amount).toBe(2)
            expect(result.shipping).toBe(30)
            expect(result.subtotal).toBe(50)
            expect(result.total).toBe(80)
        }
    })

    it('should return null order', async () => {
        const repository = mockOrderRepository(() => null)
        const service = new Service(repository as any);
        const result = await service.deleteOrder(mockOrder.id)
        expect(result).toBeNull()
    })

    it('should throw repository error', async () => {
        const repository = mockOrderRepository(() => {
            throw new Error('mock error')
        })
        const service = new Service(repository as any);
        try {
            const result = await service.deleteOrder(mockOrder.id)
        } catch (e: any) {
            expect(e.message).toBe('mock error')
        }
    })
})