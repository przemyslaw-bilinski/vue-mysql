import { createApp } from 'vue'
import App from './App.vue'
import Add from "./components/AddUser";
import Home from "./components/Home";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        name: 'Add',
        path: '/add',
        component: Add
    },
    {
        name: 'Home',
        path: '/',
        component: Home
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


createApp(App).use(router).mount('#app')
