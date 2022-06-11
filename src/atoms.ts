import { atom, selector } from 'recoil';
import { IBoards } from './interface';

export const todoState = atom<IBoards>({
  key: 'todos',
  default: {},
});

export const lengthSelector = selector({
  key: 'Length',
  get: ({ get }) => {
    const boards = get(todoState);
    return Object.keys(boards).length;
  },
});
