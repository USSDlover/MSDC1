import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from '@core/import.guard';
import {HttpClientModule} from '@angular/common/http';
import {ExamService, QuestionService} from './services';

const Providers = [
  ExamService,
  QuestionService
];

/**
 * Contains any shared interface, service and models
 * related to DTO and data serving logic
 */
@NgModule({
    imports: [
        HttpClientModule
    ],
})
export class DataModule {
    constructor(@Optional() @SkipSelf() parentModule: DataModule) {
        throwIfAlreadyLoaded(parentModule, 'DataModule');
    }

    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: DataModule,
            providers: [
                ...Providers
            ]
        } as ModuleWithProviders<any>;
    }
}
