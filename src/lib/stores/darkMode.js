import { writable } from "svelte/store";
import { useWritable, useSharedStore } from "./use-shared-store";

const clicks = []
const value = false;

export const darkModeStore = (clicks, value) => {
    const { set, update, subscribe } = writable(clicks, value);
    return {
        set,
        update,
        subscribe,
        setDarkMode: (newValue) => set([...clicks], newValue),
        updateClicks: () => set(clicks.push("click")),
    }
}

export const useDark = () =>
    useSharedStore('dark', darkModeStore, [clicks, value]);