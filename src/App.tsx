import './App.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lengthSelector, todoState } from './atoms';
import Board from './components/Board';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTab from './components/AddTab';

const Container = styled.div`
  padding: 1em;
  width: 100vw;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BoardsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5em;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const PlusBtn = styled(FaPlus)`
  width: 3rem;
  height: 3rem;
  margin-left: 1em;
  margin-top: 1em;
  border: 3px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: rotateZ(45deg);
  cursor: pointer;
  transition: all ease-in 0.2s;
  &:hover {
    transform: none;
    background-color: white;
  }
`;

const Text = styled.div`
  font-size: 2rem;
`;

function App() {
  const [addClicked, setAddClicked] = useState(false);
  const [boards, setBoards] = useRecoilState(todoState);
  const length = useRecoilValue(lengthSelector);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      setBoards((boards) => {
        const newBoard = [...boards[source.droppableId]];
        const target = newBoard[source.index];
        newBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, target);
        const newBoards = { ...boards, [destination.droppableId]: newBoard };
        const strBoards = JSON.stringify(newBoards);
        localStorage.set('boards', strBoards);
        return newBoards;
      });
    } else {
      setBoards((boards) => {
        const prevBoard = [...boards[source.droppableId]];
        const targetBoard = [...boards[destination.droppableId]];
        const target = prevBoard[source.index];
        prevBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, target);
        const newBoards = {
          ...boards,
          [source.droppableId]: prevBoard,
          [destination.droppableId]: targetBoard,
        };
        const strBoards = JSON.stringify(newBoards);
        localStorage.setItem('boards', strBoards);
        return newBoards;
      });
    }
  };
  const onAddClicked = () => setAddClicked((prev) => !prev);
  const getBoards = () => {
    setBoards((prevBoards) => {
      const strBoards = localStorage.getItem('boards');
      const newBoards = strBoards ? JSON.parse(strBoards) : { ...prevBoards };
      return newBoards;
    });
  };

  useEffect(() => {
    getBoards();
  }, []);
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardsHeader>
            <Title>Drag&Drop</Title>
            <PlusBtn onClick={onAddClicked} />
          </BoardsHeader>
          {length !== 0 ? (
            <Boards>
              {Object.keys(boards).map((category) => (
                <Board
                  key={category}
                  category={category}
                  todos={boards[category]}
                />
              ))}
            </Boards>
          ) : (
            <Text>보드가 없습니다😅</Text>
          )}
          {addClicked && <AddTab hideAdd={onAddClicked}></AddTab>}
        </Wrapper>
      </DragDropContext>
    </Container>
  );
}

export default App;
