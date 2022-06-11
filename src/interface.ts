export interface ICreateCardProps {
  category: string;
}

export interface IForm {
  todo: string;
}

export interface ITodo {
  text: string;
  id: number;
}

export interface IBoardProps {
  category: string;
  todos: ITodo[];
}

export interface ICardProps {
  todo: ITodo;
  index: number;
  category: string;
}

export interface IBoards {
  [key: string]: ITodo[];
}

export interface IAddBoard {
  text: string;
}

export interface IAddTabProps {
  hideAdd: () => void;
}
