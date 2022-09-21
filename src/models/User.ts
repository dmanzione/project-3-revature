export default class User{
    id: number
    email: string
    password: string
    firstName: string
    lastName: string

    constructor(
        id: number,
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ){
        this.id =id
        this.email = email
        this.password = password
        this.firstName=firstName
        this.lastName=lastName
    }
}