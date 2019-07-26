import { Context } from '../Context';

export default class InteractorError {
  private _error: Error;
  private _context: Context;

  public constructor(error: Error, context: Context) {
    this._error = error;
    this._context = context;
  }

  public get error(): Error {
    return this._error;
  }

  public get context(): Context {
    return this._context;
  }
}
