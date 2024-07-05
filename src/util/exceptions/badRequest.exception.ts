export default function BadRequestException(message?: string) {
  this.statusCode = 400;
  this.message = message || "Bad Request";
}

BadRequestException.prototype = Error.prototype;
