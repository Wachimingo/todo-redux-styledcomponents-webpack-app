import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Card } from 'pages/common';
import { Modal } from 'pages/common';
import { Form, Input } from 'pages/common/form/Form';

const selectTodos = (state: any) => state.todos;

export const Todos = () => {
    /* Getting the todos from the redux store. */
    const todos = Object.values(useSelector(selectTodos));
    const [filterBy, setFilterBy] = useState('new');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isToModify, setIsToModify] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<any>(undefined);
    const filteredTodos = useMemo(() => { return todos.filter((x: any) => { return x.state === filterBy }) }, [todos]);
    const dispatch = useDispatch();
    /* Use React form section */
    const { register, handleSubmit, reset, setValue, formState: { isSubmitSuccessful } } = useForm();

    const onSubmit = data => {
        if (isToModify) {
            dispatch({
                type: "todos/todoUpdateItem",
                payload: {
                    ...selectedTodo,
                    ...data,
                },
            });
            setIsToModify(false);
        } else {
            dispatch({
                type: "todos/todoAdded",
                payload: [{
                    ...data,
                    state: 'new'
                }]
            });
        }
        setIsModalOpen(false);
    }

    const todoUpdateState = (id: any, state: any) => {
        dispatch({
            type: "todos/todoUpdateState",
            payload: {
                id,
                state,
            },
        });
    }

    const loadTodoToModify = (todo) => {
        setValue('id', todo.id)
        setValue('title', todo.title);
        setValue('body', todo.body);
        setIsModalOpen(true);
        setIsToModify(true);
        setSelectedTodo(todo);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                title: '',
                body: ''
            });
        }
    }, [reset, isModalOpen])

    const renderedList = filteredTodos.map((todo: any) => {
        return <Card key={todo.id} {...todo}>
            <div slot='header'>
                <h4><b>{todo.title}</b></h4>
                <Button type='info' onClick={() => loadTodoToModify(todo)}>Modify</Button>
                <hr />
            </div>
            <div slot='body'>
                <p>{todo.body}</p>
                <hr />
                <p>State: <span>{todo.state}</span></p>
            </div>
            <div slot='button'>
                <Button type='error' onClick={() => todoUpdateState(todo.id, 'cancel')}>Cancel</Button>
                <Button type='success' onClick={() => todoUpdateState(todo.id, 'completed')}>Complete</Button>
            </div>
        </Card>
    })

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <section>
                <Button type='info' onClick={() => setFilterBy('new')}>New</Button>
                <Button type='warning' onClick={() => setFilterBy('in-progress')}>In Progress</Button>
                <Button type='success' onClick={() => setFilterBy('completed')}>Completed</Button>
                <Button type='error' onClick={() => setFilterBy('cancel')}>Cancel</Button>
            </section>
            <hr />
            <main>
                <h1>{filterBy} Tasks</h1>
                {renderedList}
            </main>
            <section>
                <Modal isOpen={isModalOpen} closeModal={setIsModalOpen} reset={reset} wrapperId='add-new-todo'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Add Todo</h1>
                        <hr />
                        <label htmlFor='title'>Title</label>
                        <Input type='text' id='title' {...register('title')} />
                        <label htmlFor='body'>Body</label>
                        <Input type='text' id='body' {...register('body')} />
                        <Input type='submit' />
                        <hr />
                    </Form>
                </Modal>
                <Button type='info' onClick={() => { setIsModalOpen(true) }}>Open</Button>
            </section>
        </>
    )
}