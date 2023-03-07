import axios from 'axios';

// 회원 - 회원가입
export async function signUp(userId, password) {
    try {
        return await axios.post('http://121.161.237.50:50005/api/user/up', {
            userId,
            password,
        });
    } catch (e) {
        console.error(e);
    }
}

// 회원 - 로그인
export async function signIn(userId, password) {
    // console.log('api: ', userId, password);

    return await axios.get('http://121.161.237.50:50005/api/user/in', {
        params: {
            userId,
            password,
        },
    });
}




// 캘린더 - 목록
export async function listCalendar(userNo, year, month) {
    return await axios.get('http://121.161.237.50:50005/api/diary/list', {
        params: {
            userNo,
            year,
            month,
        }
    });
}

// 캘린더 - 등록
// parameter: userNo, content, regDate
export async function saveCalendar(payload) {
    return await axios.post('http://121.161.237.50:50005/api/diary/save', {
        userNo: payload.userNo,
        contents: payload.contents,
        regDate: payload.regDate,
        diaryNo: payload.diaryNo,
    });
}

// 캘린더 - 삭제
// parameter:
export async function removeCalendar(diaryNo) {
    return await axios.delete(`http://121.161.237.50:50005/api/diary/remove/${ diaryNo }`);
}



// 추억 - 등록
export async function saveMemory(payload) {
    return await axios.post(`http://121.161.237.50:50005/api/memory/save`, payload);
}
