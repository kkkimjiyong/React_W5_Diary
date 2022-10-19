import React from 'react';
import Layout from '../components/layout/Layout';
import Header from '../components/header/Header';
import TodosList from '../components/todosList/TodosList';


const Todos = () => {
    return (
        <Layout>
            <Header>Deatil Diary</Header>

            <TodosList />
        </Layout>
    );
};

export default Todos;