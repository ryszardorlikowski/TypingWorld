import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Dashboard from "@/views/Dashboard";
import Lesson from "@/views/Lesson";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/lesson/:lessonId',
        name: 'Lesson',
        component: Lesson,
        meta: {
            requiresAuth: true,
        },
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters['auth/isLoggedIn']) {
            router.push({name: 'Login'})
        }else{
            next();
        }
    } else {
        next()
    }
})
export default router
