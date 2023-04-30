import { AddressType } from '@/types';
import { atom } from 'jotai';

export const addressModalAtom = atom<boolean>(false);
export const addressAtom = atom<null | AddressType>(null);
export const addressesAtom = atom<null | AddressType[]>(null);
export const defaultBillingAddressAtom = atom<null | AddressType>(null);
export const defaultShippingAddressAtom = atom<null | AddressType>(null);
