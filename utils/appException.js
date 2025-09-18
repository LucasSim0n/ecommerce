export const appException = {
  internalServerError: {
    error: true,
    status: 500,
    message: "Internal Server Error"
  },
  notFound: {
    error: true,
    status: 404,
    message: "Not Found"
  },
  badRequest: (message) => {
    return {
      error: true,
      status: 400,
      message: "Bad Request: " + message
    }
  },
}
