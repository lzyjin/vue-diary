import axios from 'axios';

export async function signUp(userId, password) {
    console.log('api: ', userId, password);
    try {
        return await axios.post('http://121.161.237.50:50005/api/user/up', {
            userId,
            password,
        });
    } catch (e) {
        console.error(e);
    }
}

export async function signIn(userId, password) {
    console.log('api: ', userId, password);

    return await axios.get('http://121.161.237.50:50005/api/user/in', {
        params: {
            userId,
            password,
        },
    });
}

export async function calendarList(userNo, year, month) {
    return await axios.get('http://121.161.237.50:50005/api/diary/list', {
        params: {
            userNo,
            year,
            month,
        }
    });
}

// parameter: userNo, content, regDate
export async function writeCalendar() {

}
