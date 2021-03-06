/* eslint-disable no-shadow, no-unused-vars */
export enum Events {
    LOG = 'log',
    DEBUG = 'debug',
}

export interface LoaderOptions {
    eventDir: string
}

export interface EventOptions {
    name: string;
    once?: boolean;
    ws?: boolean;
}

export interface ColorOptions {
	json?: boolean;
}
