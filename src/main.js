import { createApp } from 'vue'
import App from './App.vue'
import Home from "./components/Home";
import Add from "./components/AddUser";
import Login from "./components/Login";
import User from "./components/User";
import {createRouter, createWebHashHistory} from "vue-router";


const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Add',
        path: '/add',
        component: Add
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'User',
        path: '/user/:name/:email',
        component: User,
    },
    {
        name: 'Send',
        path: '/send/:sender/:recipient/:subject/:message',
        component: User,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
createApp(App).use(router).mount('#app')
