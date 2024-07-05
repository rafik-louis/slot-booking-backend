// babel.config.js
module.exports = {
	presets: ['@babel/preset-env', "@babel/preset-react"],
};


module.exports = api => {
	const isTest = api.env('test');
	// You can use isTest to determine what presets and plugins to use.

	return {
		// ...
	};
};