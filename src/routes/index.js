import VueRouter from "vue-router";
import SignIn from '@/views/user/signIn';
import SignUp from "@/views/user/signUp";
import CalendarList from "@/views/calendar/CalendarList";
import MemoryList from "@/views/memory/MemoryList";
import MemoryView from "@/views/memory/MemoryView";
import { store } from '@/store';

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
            redirect: '/'
        },
        {
            path: '/signout',
            name:'SignOut',
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
        },
        {
            path: '/memoryList',
            name: 'MemoryList',
            component: MemoryList,
        },
        {
            path: '/memoryView/:memoryNo',
            name: 'MemoryView',
            component: MemoryView,
        },
    ],
});


// TODO: 로그인 체크는 cookie값이 아니라 getters로 가져온 state값이 있는지로 결정한다. (없으면 cookie값을 state에 집어넣어)
// TODO: cookie가 아니라 LocalStorage에 저장하기
// TODO: state의 값을 사용할 때는 state에 직접 접근하지 말고 무조건 getters로 접근하자.
router.beforeEach((to, from, next) => {

    store.dispatch('common/CLOSE_MENU');

    if (to.name === 'SignOut') {
        localStorage.removeItem('userData');
        store.dispatch('user/SIGN_OUT')
        .then(() => {
            alert('로그아웃되었습니다. 다시 로그인을 해 주세요.');
            next("/signin");
        });

    } else if (to.name === 'Calendar') {
        if (!store.getters["user/getSignedInUserData"]) {
            alert("로그인이 필요합니다.");
            next("/signin");
            return;
        }

        next();

    } else {
        next();
    }
});


