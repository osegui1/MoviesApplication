import { InjectionToken } from "@angular/core";
import { IAppConfig } from './appconfig.interface'

export const APP_DI_CONFIG: IAppConfig = {
    API_URL: 'http://localhost:5000/api'
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');