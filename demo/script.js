const axios = require('axios');
const sendGetRequest = async () =>{
    try{
        const resp = await axios.get('http://localhost:3000/categories');
        console.log(resp.data);   
    }catch(err){
        console.log(err);
    }
};
sendGetRequest();