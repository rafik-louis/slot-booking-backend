export default function RefreshTokenExpiredException() {
	this.statusCode = 601;
	this.message = "refresh token expired";
}

RefreshTokenExpiredException.prototype = Error.prototype;
