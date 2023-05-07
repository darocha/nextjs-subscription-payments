import { atom } from 'jotai';

export const showErrorMessageAtom = atom<boolean>(false);
export const errorMessageAtom = atom<string>(
  'There was an error! Please try again.'
);
