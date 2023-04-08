import axios from 'axios';
const prefix = "http://121.161.237.50:50005/api/";
const userApi = {
    up: `${prefix}user/up`,
    in: `${prefix}user/in`
}
const calendarApi = {
    list: `${prefix}diary/list`,
    save: `${prefix}diary/save`,
    delete: (diaryNo) => `${prefix}diary/remove/${ diaryNo }`
}
const memoryApi = {
    save: `${prefix}memory/save`,
    list: `${prefix}memory/`,
    detail: (memoryNo) => `${prefix}memory/${memoryNo}`,
    delete: (memoryNo) => `${prefix}memory/${memoryNo}`
}

const post = (url, parameter) => {
    return  axios.post(url, parameter);
}
const get = (url, parameter) => {
    return axios.get(url, parameter);
}
const remove = (url, parameter) => {
    return axios.delete(url, parameter);
}

// 회원 - 회원가입
export async function signUp(parameter = {userId : "", password : ""}) {
    try {
        return await post(userApi.up, parameter);
    } catch (e) {
        console.error(e);
    }
}

// 회원 - 로그인
export async function signIn(userId, password) {
    // console.log('api: ', userId, password);
    return get(userApi.in, {userId, password});
}




// 캘린더 - 목록
export async function listCalendar(userNo, year, month) {
    return await axios.get(calendarApi.list, {
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
    return await axios.post(calendarApi.save, {
        userNo: payload.userNo,
        contents: payload.contents,
        regDate: payload.regDate,
        diaryNo: payload.diaryNo,
    });
}

// 캘린더 - 삭제
// parameter:
export async function removeCalendar(diaryNo) {
    return await axios.delete(calendarApi.delete(diaryNo));
}



// 추억 - 등록
export async function saveMemory(payload) {
    return await axios.post(memoryApi.save, payload,
        {
            headers: {
                'Content-Type': 'multipart/formed-data',
            }
        }
    );
}


// 추억 - 목록
export async function listMemory({userNo, page, limit, address, category, startDate, endDate, offset, searchText}) {
    return await axios.get(memoryApi.list, {
        params: {
            userNo,
            page,
            limit,

            address,
            category,
            startDate,
            endDate,
            offset,
            searchText,
        },
    });
}


// 추억 - 상세
export async function getMemory(memoryNo) {
    return await axios.get(memoryApi.detail(memoryNo));
}


// 추억 - 삭제
export async function deleteMemory(memoryNo) {
    return await axios.delete(memoryApi.delete(memoryNo));
}


