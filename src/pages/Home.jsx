import React from 'react';
import HomeMenu from '../components/homeMenu/HomeMenu';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import TodosList from '../components/todosList/TodosList';


const Home = () => {
    return (
        <Layout>

            <Header>Someone's Diary</Header>
            <TodosList />
        </Layout>
    );
};

export default Home;