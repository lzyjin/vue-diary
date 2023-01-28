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

    try {
        return await axios.get('http://121.161.237.50:50005/api/user/in', {
            userId,
            password,
        })
    } catch (e) {
        console.error(e);
    }
}
