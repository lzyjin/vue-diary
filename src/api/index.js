import axios from 'axios';

export function signUp(userId, password) {
    axios.post('121.161.237.50:50005', {
        method: 'post',
        url: '/api/user/up',
        data: {
            userId,
            password,
        },
    }).then(function (response) {
        console.log(response.data);
    });
}