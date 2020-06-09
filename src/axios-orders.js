import axios from "axios"

const instance = axios.create({
    baseURL: 'https://burger-builder-b9da7.firebaseio.com/'
});

export default instance;
