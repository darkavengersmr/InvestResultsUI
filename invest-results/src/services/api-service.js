export default class ApiService {
    getInvestments() {

        const data = [        
            {
              "id": 1,
              "description": "Брокерский счет Сбербанк",
              "category_id": 1,
              "is_active": true
            },
            {
              "id": 2,
              "description": "ИИС Сбербанк",
              "category_id": 2,
              "is_active": true
            },
            {
              "id": 3,
              "description": "Квартира 123-45",
              "category_id": 3,
              "is_active": true
            }        
          ];
          
        return new Promise((resolve, reject) => {            
            setTimeout(() => { 
                //reject(new Error("Error test"))               
                resolve(data)
            }, 2000);
        });
    }
}