import dayjs from 'dayjs';
import { AbstractLogger } from './AbstractLogger';

export class ConsoleLogger extends AbstractLogger {
    debug(message?: any, ...optionalParams: any[]): void {
        console.debug(dayjs().format('YYYY-MM-DD HH:mm:ss') + ' [DEBUG] ' + message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]): void {
        console.error(dayjs().format('YYYY-MM-DD HH:mm:ss') + ' [ERROR] ' + message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]): void {
        console.info(dayjs().format('YYYY-MM-DD HH:mm:ss') + ' [INFO] ' + message, ...optionalParams);
    }

    log(message?: any, ...optionalParams: any[]): void {
        console.log(dayjs().format('YYYY-MM-DD HH:mm:ss') + ' [LOG] ' + message, ...optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]): void {
        console.warn(dayjs().format('YYYY-MM-DD HH:mm:ss') + ' [WARN] ' + message, ...optionalParams);
    }
}
