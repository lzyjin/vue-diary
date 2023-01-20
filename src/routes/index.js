import VueRouter from "vue-router";
import SignIn from '@/views/user/signIn';
import SignUp from '@/views/user/signUp';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name:'SignIn',
            component: SignIn,
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp,
        },
        {
            path: '/signin',
            name:'SignIn',
            component: SignIn,
        },
    ],
});

