import { getContext, hasContext, setContext } from "svelte";
import { writable } from "svelte/store";

// context for any type of store
export const useSharedStore = (name) => {
    if (hasContext(name)) {
        return getContext<T>(name);
    }
    const _value = fn(defaultValue);
    setContext(name, _value);
    return _value;
};

// writable store context
export const useWritable = (name, value) =>
    useSharedStore(name, writable, value);
