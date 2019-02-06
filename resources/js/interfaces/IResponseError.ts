export default interface IResponseError extends XMLHttpRequest {
  response: {
    data: {
      message: string;
      errors: [];
    }
  }
}
