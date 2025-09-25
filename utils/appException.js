export class AppError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
  toJson() {
    return {
      status: this.status,
      message: this.message
    }
  }
}

export const appException = {
  internalServerError: () => new AppError("Internal Server Error", 500),
  notFound: () => new AppError("Not Found", 404),
  productNameExists: () => new AppError("Product Name Already Exists", 400),
  noChangesMade: () => new AppError("No Changes Made", 400),
  invalidUpdate: () => new AppError("Invalid Update", 400),
  invalidInsert: () => new AppError("Invalid Insert", 400),
  accountExists: () => new AppError("Account with given email already exists", 400),
  invalidLogin: () => new AppError("Invalid Login", 400),
  noJWTProvided: () => new AppError("No JWT Provided", 401),
  invalidJWT: () => new AppError("Invalid JWT", 403),
  noAdmin: () => new AppError("No Admin", 401),
}
