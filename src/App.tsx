import React, { useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { NavBar } from 'pages/common';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Todos } from 'pages/todos';
import { useDispatch } from 'react-redux';
import light from 'themes/light';
import dark from 'themes/dark';

/* It's a styled component that is going to be applied to the whole app. */
const GlobalStyle = createGlobalStyle<any>`
    body{
        background-color: ${(p: any) => p.theme.colors.bodyBackgroundColor};
        min-height: 100vh;
        margin: 0;
        padding: 0;
        color: ${(p: any) => p.theme.colors.bodyFontColor};
    }
`;

const App = () => {
    const [theme, setTheme] = useState(light);
    const dispatch = useDispatch();

    /**
     * I'm going to fetch some data, then I'm going to take the first 4 items from that data, and then
     * I'm going to add a property to each of those items, and then I'm going to dispatch an action
     * with the first 4 items as the payload.
     */
    const fetchTodos = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const todos = await res.json();
        if (todos.length > 0) {
            const firstTenItems = [];
            let i = 0;

            for (i; i < 4; i++) {
                todos[i].state = 'new';
                firstTenItems[i] = todos[i];
            }

            dispatch({
                type: 'todos/todoAdded',
                payload: firstTenItems
            });
        }
        else {
            dispatch({
                type: 'todos/todoAdded',
                payload: [
                    {
                        id: 1,
                        title: 'hola',
                        body: 'ttttttttt',
                        state: 'new'
                    },
                    {
                        id: 2,
                        title: 'sola',
                        body: 'xxx',
                        state: 'new'
                    },
                    {
                        id: 3,
                        title: 'adios',
                        body: 'zzzzz',
                        state: 'new'
                    }
                ]
            });
        }
    }

    /* It's fetching data from an API, and then it's dispatching an action with the fetched data as the
    payload. */
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <ThemeProvider theme={{
            ...theme, setTheme: () => {
                setTheme((currentTheme: any) => currentTheme.id === 'light' ? dark : light)
            }
        }}>
            <GlobalStyle />
            {/* Using HashRouter, as this is a SPA app BrowserRouter will try to fetch for a different html file */}
            <HashRouter  >
                <NavBar />
                <Routes>
                    <Route path="/" element={<Todos />} />
                </Routes>
            </HashRouter >
        </ThemeProvider >
    );
}

export default App;