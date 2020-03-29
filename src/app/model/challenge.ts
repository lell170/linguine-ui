import {Vocabulary} from './vocabulary';

export class Challenge {
  private _id: number;
  private _vocabulary: Vocabulary;
  private _active: boolean;
  private _resolved: boolean;
  private _retryCount: number;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get vocabulary(): Vocabulary {
    return this._vocabulary;
  }

  set vocabulary(value: Vocabulary) {
    this._vocabulary = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get resolved(): boolean {
    return this._resolved;
  }

  set resolved(value: boolean) {
    this._resolved = value;
  }

  get retryCount(): number {
    return this._retryCount;
  }

  set retryCount(value: number) {
    this._retryCount = value;
  }
}
