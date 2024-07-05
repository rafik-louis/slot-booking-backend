export default {
  UserLoginTokenExpiryMins: process.env.USER_LOGIN_TOKEN_EXPIRY_MINS || "30",
  UserRefreshTokenExpiryDays:
    process.env.USER_REFRESH_TOKEN_EXPIRY_DAYS || "20",
};
