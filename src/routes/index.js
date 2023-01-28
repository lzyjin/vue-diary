import VueRouter from "vue-router";
import SignIn from '@/views/user/signIn';
import CalendarList from "@/views/calendar/CalendarList";

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name:'SignIn',
            component: SignIn,
        },
        {
            path: '/signin',
            name:'SignIn',
            component: SignIn,
        },
        {
            path: '/calendar',
            name:'Calendar',
            component: CalendarList,
        },
    ],
});

