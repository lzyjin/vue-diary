import axios from 'axios';

export async function signUp(userId, password) {
    // console.log('api: ', userId, password);
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
    // console.log('api: ', userId, password);

    return await axios.get('http://121.161.237.50:50005/api/user/in', {
        params: {
            userId,
            password,
        },
    });
}

export async function listCalendar(userNo, year, month) {
    return await axios.get('http://121.161.237.50:50005/api/diary/list', {
        params: {
            userNo,
            year,
            month,
        }
    });
}

// parameter: userNo, content, regDate
export async function saveCalendar(payload) {
    return await axios.post('http://121.161.237.50:50005/api/diary/save', {
        userNo: payload.userNo,
        contents: payload.contents,
        regDate: payload.regDate,
        diaryNo: payload.diaryNo,
    });
}

// parameter:
export async function removeCalendar(diaryNo) {
    return await axios.delete(`http://121.161.237.50:50005/api/diary/remove/${ diaryNo }`);
}
