import User from "./User"

export default class Order{
    id: number
    user: User
    total: number

    constructor(
        id: number,
        user: User,
        total: number 
    ) {
        this.id = id
        this.user = user
        this.total = total
    }
}