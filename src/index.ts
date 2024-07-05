import { createConnection } from 'typeorm';
import { startServer } from './server';
import Server from 'express';
import appConfig from '../src/config/app.config';

(async () => {
	await createConnection();
	console.log('Successfully connected to PostgreSQL');
	let app: Server = await startServer();
	app.listen(appConfig.PORT, () => console.log(`Server is running on port ${appConfig.PORT}`));
})();