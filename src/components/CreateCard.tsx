import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from '../atoms';
import { ICreateCardProps, IForm } from '../interface';

const Form = styled.form`
  margin-bottom: 1em;
  display: flex;
`;

const Input = styled.input`
  flex: 1 1 90%;
  border-radius: 1em;
  text-align: center;
  border: ${(props) => props.theme.border};
`;

const Btn = styled.button`
  margin-left: 0.5em;
  flex: 1 1 10%;
  background-color: white;
  border: ${(props) => props.theme.border};
  border-radius: 0.25em;
`;

export default function CreateCard({ category }: ICreateCardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setBoards = useSetRecoilState(todoState);
  const onValid = ({ todo }: IForm) => {
    if (todo === '') {
      return;
    }
    setBoards((prevBoards) => {
      const targetBoard = [...prevBoards[category]];
      const newTodo = { text: todo, id: Date.now() };
      const newBoards = {
        ...prevBoards,
        [category]: [...targetBoard, newTodo],
      };
      const strBoards = JSON.stringify(newBoards);
      localStorage.setItem('boards', strBoards);
      return newBoards;
    });
    setValue('todo', '');
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register('todo', { required: true })}
        type='text'
        placeholder='Please add your todo'
      />
      <Btn>Add</Btn>
    </Form>
  );
}
