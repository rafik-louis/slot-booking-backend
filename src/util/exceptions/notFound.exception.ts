export default function NotFoundException(message?) {
  this.statusCode = 404;
  this.message = message || 'Not Found';
}

NotFoundException.prototype = Error.prototype;
