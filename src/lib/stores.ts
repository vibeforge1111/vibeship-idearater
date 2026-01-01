import { writable } from 'svelte/store';
import type { ScoreCard, AppState } from './types';

export const appState = writable<AppState>('input');
export const currentIdea = writable<string>('');
export const scoreCard = writable<ScoreCard | null>(null);
export const isStealthMode = writable<boolean>(false);
