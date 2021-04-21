import axios from 'axios'

const inst = axios.create({
    baseURL:'http://localhost:5000/',
});

export default inst;