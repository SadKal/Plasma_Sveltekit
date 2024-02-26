import { writable } from "svelte/store";
import { useSharedStore } from "./use-shared-store";

export const userStore = writable({});
export const useUser = () => useSharedStore('user', userStore);