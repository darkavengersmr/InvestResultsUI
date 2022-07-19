import axios from "axios";

export default class ApiService {

    registerUser(data) {           
      return axios({
        method: 'post',
          url: "/api/register",        
          headers: {
            "accept": "application/json"          
        },
        data: data 
      })        
    }

    getToken( {username, password }) {        
      return axios({
        method: 'post',
        url: '/api/token',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: 'username=' + username + '&password=' + password,
      })
    }

    getUserProfile({ token } ) {
      return axios({
        method: 'get',
        url: '/api/user',
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        }
      })
    };

}