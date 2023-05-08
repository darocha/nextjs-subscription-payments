import { CategoryType } from '@/types/category';
import { atom } from 'jotai';

export const categoryModalAtom = atom<boolean>(false);
export const categoryAtom = atom<null | CategoryType>(null);
export const categoriesAtom = atom<null | CategoryType[]>(null);
