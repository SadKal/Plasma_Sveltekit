import { redirect } from '@sveltejs/kit';

export function load() {
    throw redirect(302, '/genres/Themes-31');
}