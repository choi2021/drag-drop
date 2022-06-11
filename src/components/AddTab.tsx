import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from '../atoms';
import { IAddBoard, IAddTabProps } from '../interface';

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 0.5em 1em;
  text-align: center;
  height: 30vh;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 1em;
`;

const Header = styled.div`
  position: relative;
  padding: 1em 0.5em;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1em;
  font-weight: bold;
`;

const Form = styled.form``;

const Input = styled.input`
  width: 70%;
  font-size: 1.1rem;
  text-align: center;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const DeleteBtn = styled(FaTimes)`
  position: absolute;
  font-size: 1.3rem;
  top: 20%;
  right: 3%;
  flex-basis: 10%;
  cursor: pointer;
`;

export default function AddTab({ hideAdd }: IAddTabProps) {
  const [todos, setTodos] = useRecoilState(todoState);
  const { setValue, handleSubmit, register } = useForm<IAddBoard>();
  const onValid = ({ text }: IAddBoard) => {
    setTodos((prevBoards) => {
      const updatedBoard = { ...prevBoards, [text]: [] };
      const strBoard = JSON.stringify(updatedBoard);
      localStorage.setItem('boards', strBoard);
      return { ...prevBoards, [text]: [] };
    });
    setValue('text', '');
  };
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    if (!event.currentTarget.dataset.value) {
      hideAdd();
    }
  };

  return (
    <Container onClick={onClick}>
      <Wrapper data-value='Wrapper' onClick={onClick}>
        <Header>
          <Title>Add Board </Title>
          <DeleteBtn onClick={hideAdd} />
        </Header>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            type='text'
            {...register('text')}
            placeholder='Please Add Your Board'
          />
        </Form>
      </Wrapper>
    </Container>
  );
}
