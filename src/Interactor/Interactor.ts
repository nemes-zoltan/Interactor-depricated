import { ContextClass, Context } from '../Context';
import { Hook, addHookFunction } from '../Hook';
import InteractorError from '../InteractorError';

export default abstract class Interactor<ContextType> {
  protected context: Context & ContextType;
  private _hooks: Hook;

  public constructor(context: Context | ContextType = ({} as any) as ContextType) {
    // @ts-ignore
    this.context = ContextClass.build<ContextType>(context);
    this._hooks = new Hook();
  }

  public static async exec<ContextArgument>(
    context: Context | ContextArgument = ({} as any) as ContextArgument,
  ): Promise<Context & ContextArgument> {
    const Klass: any = this;
    const interactor: Interactor<ContextArgument> = new Klass(context);
    await interactor._run();
    return interactor.context;
  }

  public abstract async exec(): Promise<void>;

  public async rollback(): Promise<void> {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected beforeHooks(addHooks: addHookFunction): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected afterHooks(addHooks: addHookFunction): void {}

  private async _run(): Promise<void> {
    this._collectHooks();
    try {
      await this._hooks.runBeforeHooks();
      await this.exec();
      await this._hooks.runAfterHooks();
      this.context.executed(this);
    } catch (error) {
      await this.context.rollback();
      if (error instanceof InteractorError) {
        throw error;
      } else if (!(error instanceof ContextClass)) {
        this.context._forceFail();
        throw new InteractorError(error, this.context);
      }
    }
  }

  private _collectHooks(): void {
    this.beforeHooks(this._hooks.addBeforeHooks);
    this.afterHooks(this._hooks.addAfterHooks);
  }
}
