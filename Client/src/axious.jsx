import axios from "axios";

const Instance = axios.create({
    baseURL : 'https://smart-packaging.onrender.com',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json',
        
    }
});

export default Instance