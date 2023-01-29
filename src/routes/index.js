import VueRouter from "vue-router";
import SignIn from '@/views/user/signIn';
import SignUp from "@/views/user/signUp";
import CalendarList from "@/views/calendar/CalendarList";
import { store } from "../store/user/index";

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
            path: '/signup',
            name:'SignUp',
            component: SignUp,
        },
        {
            path: '/calendar',
            name:'Calendar',
            component: CalendarList,
            beforeEnter: (to, from, next) => {
                console.log(to,from,next);
                // const signedInUserId = store.getters['getSignedInUserId'];
                const {signedInUserId} = store.state;
                if(!signedInUserId) {

                    alert("로그인이 필요합니다.");
                    next("/signin");
                    return;
                }
                next();
            },
        },
    ],
});



