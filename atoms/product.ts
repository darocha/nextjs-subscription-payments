import { ProductType } from '@/types/nft';
import { atom } from 'jotai';

export const productModalAtom = atom<boolean>(false);
export const productAtom = atom<null | ProductType>(null);
export const productsAtom = atom<null | ProductType[]>(null);
