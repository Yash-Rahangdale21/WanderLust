const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(''),
        image: Joi.object({
            filename: Joi.string().required(),
            url: Joi.string().uri().default('https://unsplash.com/photos/a-wooden-table-topped-with-vases-filled-with-flowers-QeVMDp0wohM')
        }).required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});