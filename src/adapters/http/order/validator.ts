import Status from '../../../domain/order/status'
import * as Joi from 'joi';

export const uuidSchema = Joi.string().trim().required().length(24)

export const statusSchema = Joi.string().trim().valid(...Object.values(Status))

export const productSchema = Joi.object({
    amount: Joi.number().required().min(1),
    price: Joi.number().required(),
    name: Joi.string().trim().required(),
})

export const cartSchema = Joi.array().required().min(1).items(productSchema)

export const createOrderSchema =  Joi.object({
    customer: Joi.string().trim().required(),
    status: statusSchema.default(Status.PENDENTE),
    cart: cartSchema,
    shipping: Joi.number().required(),
    date: Joi.date().default(() => new Date().toISOString()).cast("string"),
    total: Joi.number(),
    subtotal: Joi.number(),
})

export const putOrderSchema =  Joi.object({
    id: uuidSchema,
    customer: Joi.string().trim().required(),
    status: statusSchema.required(),
    cart: cartSchema,
    shipping: Joi.number().required(),
    date: Joi.date().required().cast("string"),
    total: Joi.number().required(),
    subtotal: Joi.number().required(),
});
