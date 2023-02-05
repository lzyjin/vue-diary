import VueRouter from "vue-router";
import SignIn from '@/views/user/signIn';
import SignUp from "@/views/user/signUp";
import CalendarList from "@/views/calendar/CalendarList";
import cookies from 'vue-cookies';


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
            path: '/signout',
            name:'SignOut',
            // beforeEnter(to, from, next) {
            //     console.log(to, from, next);
            //
            //     cookies.remove('userId');
            //     if (!cookies.get('userId')) {
            //         alert('로그아웃되었습니다. 다시 로그인을 해 주세요.');
            //         next("/signin");
            //     }
            // },
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
            // beforeEnter: (to, from, next) => {
            //     console.log(to, from, next);
            //
            //     if (!cookies.get('userId')) {
            //         alert("로그인이 필요합니다.");
            //         next("/signin");
            //         return;
            //     }
            //     next();
            // },
        },
    ],
});

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);

    if (to.name === 'SignOut') {
        cookies.remove('userId');
        if (!cookies.get('userId')) {
            alert('로그아웃되었습니다. 다시 로그인을 해 주세요.');
            next("/signin");
        }
    } else if (to.name === 'Calendar') {
        if (!cookies.get('userId')) {
            alert("로그인이 필요합니다.");
            next("/signin");
            return;
        }
        next();
    } else {
        next();
    }
});


