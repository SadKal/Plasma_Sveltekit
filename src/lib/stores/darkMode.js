import { writable } from "svelte/store";
import { useWritable, useSharedStore } from "./use-shared-store";

const clicks = []
const value = false;

const _darkModeStore = writable({clicks, value});

const addClicks = () => {
    _darkModeStore.update((self) => {
        self.clicks.push("click");
        return self;
    })
}
const setDarkMode = (value) => {
    _darkModeStore.update((self) => {
        self.value = value;
        return self;
    })
}
export const darkModeStore = () => {
    return {
        subscribe: _darkModeStore.subscribe,
        set: _darkModeStore.set,
        update: _darkModeStore.update,
        setDarkMode,
        addClicks
    }
}

export const useDark = () =>
    useSharedStore('dark', darkModeStore, [clicks, value]);