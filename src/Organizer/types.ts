import { Context } from '..';

interface Iinteractable<ContextType> {
  exec: (context: Context | ContextType) => Promise<Context & ContextType>;
}

export type InteractableList<ContextType> = Iinteractable<ContextType>[];
