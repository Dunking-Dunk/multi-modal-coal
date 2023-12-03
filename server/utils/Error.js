export default class ErrorThrower extends Error {
    constructor(message, statusCode) {
        super(message) 
        this.statusCode = statusCode
    }
}