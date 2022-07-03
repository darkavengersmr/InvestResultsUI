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

    createInvestment({ token, params, data }) {
      return axios({
        method: 'post',
          url: "/users/investment_items/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params,
        data: data 
      })        
    }

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

    createCategory({ token, params, data }) {
      return axios({
        method: 'post',
          url: "/users/categories/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params,
        data: data 
      })        
    }

    deleteCategory({ token, params, }) {
      return axios({
        method: 'delete',
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

    createHistory({ token, params, data }) {
      return axios({
        method: 'post',
          url: "/users/investment_history/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params,
        data: data 
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

    createInOut({ token, params, data }) {
      return axios({
        method: 'post',
          url: "/users/investment_inout/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params,
        data: data 
      })        
    }

    getJSONReports({ token, params }) {        
      return axios({
        method: 'get',
          url: "/users/reports/json/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
    };

    getXLSXReports({ token, params }) {
      return axios({
        method: 'get',
        url: "/users/reports/xlsx/",
        responseType: "blob",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
    };
    
}