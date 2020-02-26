import Joi from '@hapi/joi';
import { LogLevel } from 'demux';

const { error, value } = Joi.object({
    LOG_LEVEL: Joi.string(),
    DEMUX_START_AT_BLOCK: Joi.number().integer().raw(),
    DEMUX_ONLY_IRREVERSIBLE: Joi.boolean().raw(),
    DEMUX_POLL_INTERVAL: Joi.number().integer().raw(),
    DB_USER: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.string(),
    DB_DATABASE: Joi.string(),
    DB_SCHEMA: Joi.string(),
}).unknown().validate(process.env)

if (error) {
    throw error
}

const DB_CONFIG = {
    user: value.DB_USER as string,
    password: value.DB_PASSWORD as string,
    host: value.DB_HOST as string,
    port: value.DB_PORT as string,
    database: value.DB_DATABASE as string,
    schema: value.DB_SCHEMA as string,
}

const DEMUX_CONFIG = {
    startAtBlock: Number(value.DEMUX_START_AT_BLOCK) as number,
    onlyIrreversible: Boolean(value.DEMUX_ONLY_IRREVERSIBLE) as boolean,
    pollInterval: Number(value.DEMUX_POLL_INTERVAL) as number,
}

const LOG_LEVEL = value.LOG_LEVEL as LogLevel;

export {
    DB_CONFIG,
    DEMUX_CONFIG,
    LOG_LEVEL,
}