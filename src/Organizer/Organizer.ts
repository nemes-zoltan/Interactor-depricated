import { InteractableList } from './types';
import { Context } from '../Context';

export default abstract class Organizer<ContextType> {
  public abstract organize(): InteractableList<ContextType>;

  public static async exec<ContextArgument>(
    context: Context | ContextArgument = ({} as any) as ContextArgument,
  ): Promise<Context & ContextArgument> {
    const Klass: any = this;
    const organizer: Organizer<ContextArgument> = new Klass(context);
    // @ts-ignore
    return await organizer._run(context);
  }

  public async _run(context: Context & ContextType): Promise<Context & ContextType> {
    for (let interactorClass of this.organize()) {
      context = await interactorClass.exec(context);
      if (context.isFailure) {
        break;
      }
    }
    return context as Context & ContextType;
  }
}
