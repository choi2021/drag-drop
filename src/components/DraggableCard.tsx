import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ICardProps } from '../interface';
import { FaTrashAlt } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';

const Wrapper = styled.div`
  display: flex;
`;

const Item = styled.li`
  background-color: white;
  border-radius: 0.2em;
  padding: 0.25em 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  position: relative;
  flex-basis: 90%;
`;

const DeleteBtn = styled.button`
  flex-basis: 10%;
  color: ${(props) => props.theme.textColor};
`;

function DraggableCard({ todo, index, category }: ICardProps) {
  const setTodos = useSetRecoilState(todoState);
  const onDelete = () => {
    setTodos((prevBoards) => {
      const newBoard = [...prevBoards[category]];
      newBoard.splice(index, 1);
      const newBoards = { ...prevBoards, [category]: newBoard };
      const strBoards = JSON.stringify(newBoards);
      localStorage.setItem('boards', strBoards);
      return newBoards;
    });
  };
  return (
    <Draggable draggableId={todo.id + ''} key={todo.id} index={index}>
      {(provided) => (
        <Wrapper>
          <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>{todo.text}</span>
          </Item>
          <DeleteBtn onClick={onDelete}>
            <FaTrashAlt />
          </DeleteBtn>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
