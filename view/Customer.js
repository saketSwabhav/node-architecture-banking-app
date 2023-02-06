import { v4 } from "uuid";

class Customer {
    constructor(firstName,lastName,totalBalance){
        this.id= v4()
        this.firstName = firstName
        this.lastName = lastName
        this.totalBalance = totalBalance
    }
}

export default Customer