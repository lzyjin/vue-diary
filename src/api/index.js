import axios from 'axios';

// 회원 - 회원가입
export async function signUp(userId, password) {
    try {
        return await post(userApi.up, parameter);
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
    return await axios.post(`http://121.161.237.50:50005/api/memory/save`, payload,
        {
            headers: {
                'Content-Type': 'multipart/formed-data',
            }
        }
    );
}


// 추억 - 목록
export async function listMemory(payload) {
    return await axios.get(`http://121.161.237.50:50005/api/memory/`, {
        params: {
            userNo: payload.userNo,
            page: payload.page,
            limit: payload.limit,

            address: payload.address,
            category: payload.category,
            startDate: payload.startDate,
            endDate: payload.endDate,
            offset: payload.offset,
            searchText:payload.searchText,
        },
    });
}


// 추억 - 상세
export async function getMemory(memoryNo) {
    return await axios.get(`http://121.161.237.50:50005/api/memory/${memoryNo}`);
}


// 추억 - 삭제
export async function deleteMemory(memoryNo) {
    return await axios.delete(`http://121.161.237.50:50005/api/memory/${memoryNo}`);
}
