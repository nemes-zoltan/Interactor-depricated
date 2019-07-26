export type AsyncHookFunction = () => Promise<void>;
export type HookFunction = () => void;

export type CombinedHookFunction = HookFunction | AsyncHookFunction;
export type addHookFunction = (...hookFunctions: CombinedHookFunction[]) => void;
