import axios from "axios";

export default class ApiService {
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

    getInvestments({ token, params }) {        
      return axios({
        method: 'get',
          url: "/users/investment_items/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
    };

    getCategories({ token, params }) {
      return axios({
        method: 'get',
          url: "/users/categories/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
        
    }

    getHistory({ token, params }) {
      return axios({
        method: 'get',
          url: "/users/investment_history/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
    }

    getInOut({ token, params }) {
      return axios({
        method: 'get',
          url: "/users/investment_inout/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
    }

}