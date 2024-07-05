 export default function InvalidCredentialsException() {
  this.statusCode = 400;
  this.message = 'Invalid Credentials';
}

InvalidCredentialsException.prototype = Error.prototype;
