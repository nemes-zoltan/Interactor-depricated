import ContextClass from './Context';

export interface ContextArgument {
  [key: string]: any;
}

export interface Context
  extends Pick<ContextClass, Exclude<keyof ContextClass, 'executed' | 'rollback' | '_forceFail'>> {
  [key: string]: any;
}
