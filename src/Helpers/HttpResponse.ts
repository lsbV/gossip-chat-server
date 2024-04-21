export class HttpResponseCodes{

    public static readonly BadRequest = 400;
    public static readonly InternalServerError = 500;
    public static readonly Ok = 200;
    public static readonly Created = 201;
    public static readonly NoContent = 204;
    public static readonly NotFound = 404;
}

export class HttpResponseMessages{
    public static readonly BadRequest = {error: "Bad Request"};
    public static readonly InternalServerError = {error: "Internal Server Error"};
    public static readonly NotFound = {error: "Not Found"};
    public static readonly Unauthorized = {error: "Unauthorized"};
    public static readonly LoggedOut = {message: "Logged out"};
}