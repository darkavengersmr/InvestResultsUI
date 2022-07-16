import axios from "axios";

export default class ApiService {

    registerUser(data) {           
      return axios({
        method: 'post',
          url: "/register",        
          headers: {
            "accept": "application/json"          
        },
        data: data 
      })        
    }

    getToken( {username, password }) {        
      return axios({
        method: 'post',
        url: '/token',
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
        url: '/user',
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        }
      })
    };

}