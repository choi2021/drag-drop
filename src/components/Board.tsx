import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { IBoardProps } from '../interface';
import CreateCard from './CreateCard';
import DraggableCard from './DraggableCard';
import { FaTimes } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';

const List = styled.ul`
  width: 25em;
  background-color: ${(props) => props.theme.listColor};
  border-radius: 1em;
  padding: 1em;
  height: 30rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  flex-basis: 90%;
  margin-right: 1em;
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const DeleteBtn = styled(FaTimes)`
  position: absolute;
  font-size: 1.3rem;
  transform: translateY(20%);
  right: 3%;
  flex-basis: 10%;
  cursor: pointer;
`;

function Board({ category, todos }: IBoardProps) {
  const setTodos = useSetRecoilState(todoState);
  const onDelete = () => {
    setTodos((prevBoards) => {
      const newBoards = { ...prevBoards };
      delete newBoards[category];
      const strBoards = JSON.stringify(newBoards);
      localStorage.setItem('boards', strBoards);
      return newBoards;
    });
  };
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <List ref={provided.innerRef} {...provided.droppableProps}>
          <BoardHeader>
            <Title>{category}</Title>
            <DeleteBtn onClick={onDelete} />
          </BoardHeader>
          <CreateCard category={category}></CreateCard>
          {todos?.map((item, idx) => (
            <DraggableCard
              category={category}
              todo={item}
              index={idx}
              key={item.id}
            />
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

export default React.memo(Board);
