import { Interactor } from '../Interactor';
import { ContextArgument } from './types';

export default class Context {
  private _failure: boolean = false;
  private _executed: Interactor<any>[] = [];
  private _rolledBack: boolean = false;
  private _failureMessage: string | null = null;

  private constructor(context: ContextArgument) {
    Object.assign(this, context);
  }

  public static build(context: Context | ContextArgument = {}): Context {
    return context instanceof Context ? context : new Context(context);
  }

  public get isSuccess(): boolean {
    return !this.isFailure;
  }

  public get isFailure(): boolean {
    return this._failure;
  }

  public get failureMessage(): string | null {
    return this._failureMessage;
  }

  public fail(failureMessage: string | ContextArgument = {}, context: ContextArgument = {}): never {
    failureMessage = typeof failureMessage === 'string' ? { _failureMessage: failureMessage } : failureMessage;
    Object.assign(this, failureMessage, context);
    this._failure = true;
    throw this;
  }

  public _forceFail(): void {
    this._failure = true;
  }

  public executed(interactor: Interactor<any>): void {
    this._executed.push(interactor);
  }

  public async rollback(): Promise<boolean> {
    if (this._rolledBack) {
      return false;
    }
    for (let interactor of this._executed.reverse()) {
      await interactor.rollback();
    }
    this._rolledBack = true;
    return true;
  }
}
