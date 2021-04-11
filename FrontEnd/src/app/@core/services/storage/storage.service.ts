import {Injectable} from '@angular/core';
import {IStorage} from '@core/interfaces';
import {StorageModel} from '@core/models';

@Injectable()
export class StorageService {
  storage = localStorage;

  constructor() {
  }

  /**
   * Will store object inside local storage using `key` pair
   * T will determine value interfaces inserted inside local storage
   * @input key
   * @input value
   */
  add<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      this.storage.setItem(key, value);
    } else {
      try {
        this.storage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log(`Got error while trying to store this: ${value}`, e);
      }
    }
  }

  /**
   * Will restore object from local storage using `key` pair
   * T will determine value interfaces retrieved from local storage
   * @input key
   */
  get<T>(key: string): IStorage<T> {
    const obj = new StorageModel<T>();

    if (this.storage.getItem(key)) {
      try {
        obj.value = JSON.parse(this.storage.getItem(key));
        obj.exist = true;
      } catch (err) {
        obj.exist = true;
        obj.value = this.storage.getItem(key) as unknown as T;
      }
    } else {
      obj.exist = false;
      obj.value = null;
    }

    return obj;

  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (e) {
    }
  }

  clear(): void {
    this.storage.clear();
  }
}
