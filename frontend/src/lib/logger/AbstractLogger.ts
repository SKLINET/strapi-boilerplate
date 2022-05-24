/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class AbstractLogger {
    abstract debug(message?: any, ...optionalParams: any[]): void;
    abstract info(message?: any, ...optionalParams: any[]): void;
    abstract log(message?: any, ...optionalParams: any[]): void;
    abstract warn(message?: any, ...optionalParams: any[]): void;
    abstract error(message?: any, ...optionalParams: any[]): void;
}
