import React from "react"
import Layout from "../components/layout/Layout"
import Header from "../components/header/Header"
import AddTodo from "../components/addTodo/AddTodo"

const AddPage = () => {
    return (
        <Layout>
            <Header>Add your diary</Header>
            <AddTodo />
        </Layout>
    )
}
export default AddPage