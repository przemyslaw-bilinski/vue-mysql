import { createApp } from 'vue'
import axios from 'axios';
import App from './App.vue'
import Home from "./components/Home";
import Registry from "./components/Registry";
import Login from "./components/Login";
import User from "./components/User";
import {createRouter, createWebHashHistory} from "vue-router";

axios.defaults.baseURL = 'http://localhost:5000/';
/*axios.defaults.headers.common['Authorization'] = localStorage.getItem('data');*/
/*axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';*/

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'registry',
        path: '/registry',
        component: Registry
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'user',
        path: '/user',
        component: User,
        props: true,
    },
    {
        name: 'update',
        path: '/update',
        component: User,
        props: true,
    },
    {
        name: 'email',
        path: '/email',
        component: User,
        props: true,
    },
    {
        name: 'send',
        path: '/send',
        component: User,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
createApp(App).use(router).mount('#app')
