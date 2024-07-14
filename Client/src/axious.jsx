import axios from "axios";

const instance = axios.create({
    baseURL : 'https://smart-packagings.onrender.com/',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json',
        
    }
});

export default instance