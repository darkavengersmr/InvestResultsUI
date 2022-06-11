export default class ApiService {
    getInvestments() {        

        const data = [        
            {
              id: 1,
              description: "Брокерский счет Сбербанк",
              category_id: 1,
              is_active: true
            },
            {
              id: 2,
              description: "ИИС Сбербанк",
              category_id: 2,
              is_active: true
            },
            {
              id: 3,
              description: "Квартира 123-45",
              category_id: 3,
              is_active: true
            }        
          ];
      
        return new Promise((resolve, reject) => {            
            setTimeout(() => { 
                //reject(new Error("Error test"))               
                resolve(data)
            }, 1000);
        });
    };

    getCategories() {

        const data = [
            {
              "id": 1,
              "category": "Брокерский счет"
            },
            {
              "id": 2,
              "category": "ИИС"
            },
            {
              "id": 3,
              "category": "Недвижимость"
            }
          ];
          
        return new Promise((resolve, reject) => {            
            setTimeout(() => { 
                //reject(new Error("Error test"))               
                resolve(data)
            }, 1000);
        });
    }

    getHistory(id) {
        const data = [
            {
              id: 1,
              "date": "2022-01-11T12:00:00+00:00",
              "sum": 64000,
              "investment_id": 1
            },
            {
              id: 2,
              "date": "2022-02-11T12:00:00+00:00",
              "sum": 153000,
              "investment_id": 1
            },
            {
              id: 3,
              "date": "2022-03-11T12:00:00+00:00",
              "sum": 256510,
              "investment_id": 1
            },
            {
            id: 4,
            "date": "2022-04-11T12:00:00+00:00",
            "sum": 303000,
            "investment_id": 1
            },
            {
            id: 5,
            "date": "2022-05-11T12:00:00+00:00",
            "sum": 356510,
            "investment_id": 1
            }
          ];
        
        return new Promise((resolve, reject) => {            
            setTimeout(() => { 
                //reject(new Error("Error test"))               
                resolve(data)
            }, 1000);
        });
    }

    getInOut(id) {
        const data = [
            {
              "id": 1,
              "date": "2022-01-11T12:00:00+00:00",
              "description": "Пополнение",
              "sum": 40000,
              "investment_id": 1
            },
            {
              "id": 2,
              "date": "2022-02-11T12:00:00+00:00",
              "description": "Пополнение",
              "sum": 51000,
              "investment_id": 1
            },
            {
              "id": 3,
              "date": "2022-03-11T12:00:00+00:00",
              "description": "Пополнение",
              "sum": 60000,
              "investment_id": 1
            },
            {
              "id": 4,
              "date": "2022-04-11T12:00:00+00:00",
              "description": "Снятие",
              "sum": -10000,
              "investment_id": 1
            },
            {
              "id": 5,
              "date": "2022-05-11T12:00:00+00:00",
              "description": "Пополнение",
              "sum": 50000,
              "investment_id": 1
            }
          ];
          
        return new Promise((resolve, reject) => {            
            setTimeout(() => { 
                //reject(new Error("Error test"))               
                resolve(data)
            }, 1000);
        });
    }

}