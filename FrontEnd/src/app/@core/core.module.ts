import {AppConfig} from './config/app.config';
import {IAppConfig} from './interfaces';
import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './import.guard';
import {ApiService, StorageService} from './services';
import {HttpClientModule} from '@angular/common/http';

export function initializeApp(appConfig: AppConfig): () => Promise<IAppConfig | void> {
  return () => appConfig.load();
}

const Providers = [
  ApiService,
  StorageService
];

@NgModule({
  imports: [HttpClientModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        AppConfig,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApp,
          deps: [AppConfig], multi: true
        },
        ...Providers
      ]
    } as ModuleWithProviders<any>;
  }
}
