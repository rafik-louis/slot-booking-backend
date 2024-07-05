export default {
	PORT: process.env.PORT || 5000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	API_PATH: process.env.API_PATH || '/api/v1',
	// TODO APP NAME
	APP_NAME: process.env.APP_NAME || 'loreal-content-labs',
	BACKEND_DOMAIN: process.env.BACKEND_DOMAIN || 'http://localhost:5000',
	DOMAIN: process.env.DOMAIN || 'http://localhost:4000',
};
