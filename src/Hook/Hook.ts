import { CombinedHookFunction } from './types';

export default class Hook {
  private _beforeHooks: CombinedHookFunction[] = [];
  private _afterHooks: CombinedHookFunction[] = [];

  public addBeforeHooks = (...hooks: CombinedHookFunction[]): void => {
    this._beforeHooks = this._beforeHooks.concat(hooks);
  };

  public addAfterHooks = (...hooks: CombinedHookFunction[]): void => {
    this._afterHooks = this._afterHooks.concat(hooks);
  };

  public async runBeforeHooks(): Promise<void> {
    for (let hook of this._beforeHooks) {
      await hook();
    }
  }

  public async runAfterHooks(): Promise<void> {
    for (let hook of this._afterHooks) {
      await hook();
    }
  }
}
