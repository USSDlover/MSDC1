import {Injectable} from '@angular/core';
import {IAppConfig} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class AppConfig {
  static settings: IAppConfig;

  constructor(private http: HttpClient) {
  }

  load(): Promise<IAppConfig | void> {
    const jsonFile = `assets/config/setting/config.${environment.production ? 'prod' : 'dev'}.json`;
    return new Promise<IAppConfig | void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise()
        .then((response: IAppConfig) => {
          AppConfig.settings = (response as IAppConfig);
          resolve();
        }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
