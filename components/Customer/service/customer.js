import Customer from "../../../models/customer.js";

class CustomerService{
    constructor(){

    }

    async addCustomer(customer){
        try {
            console.log(customer);
            let temp = await Customer.create(customer);
            console.log("temp",temp);
          } catch (e) {
              console.log(e);
            return e;
          }
    }

    async updateCustomer(customer){
        try {
            console.log(customer);
            let temp = await Customer.update(customer,{
              where: {
                  deletedAt:null,
                id: customer.id,
                
              },paranoid:false});
      
            return temp
          } catch (e) {
              console.log(e);
            return e;
          }
    }

    async getCustomers(){
        try {
            let temp = await Customer.findAll();
            console.log(temp);
            return temp
          } catch (e) {
              console.log(e);
            return e;
          }
    }

    async deleteCustomer(customerID){
        try {
              let temp = await Customer.destroy({
                where: {
                  id: customerID
                }});
        
              return temp
            } catch (e) {
                console.log(e);
              return e;
            }
    }
}
export default CustomerService