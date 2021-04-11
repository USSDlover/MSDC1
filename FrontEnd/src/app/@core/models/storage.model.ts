import {IStorage} from '../interfaces';

export class StorageModel<T> implements IStorage<T> {
  exist: boolean;
  value?: T;

  constructor() {
  }

  static create<T>(value: IStorage<T>): StorageModel<T> {
    const storage = new StorageModel<T>();
    return Object.assign(storage, value);
  }
}
