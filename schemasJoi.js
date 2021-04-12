const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});


const Joi = BaseJoi.extend(extension)

module.exports.orderSchema = Joi.object({
    order: Joi.object({
        username: Joi.string().escapeHTML(),
        orderId: Joi.number().min(0),
        accept: Joi.string().escapeHTML(),
        date: Joi.string().escapeHTML(),
        service: Joi.string().escapeHTML()
    }).required(),
});






