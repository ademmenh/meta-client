import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    BUN_ENV: Joi.string()
        .valid('dev', 'prod')
        .default('dev'),

    PORT: Joi.number()
        .default(8000),

    META_APP_ID: Joi.string()
        .required(),

    META_SYSTEM_USER_TOKEN: Joi.string()
        .required(),

    META_GRAPH_VERSION: Joi.string()
        .default('24.0'),
});
