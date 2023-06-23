import path from 'path';
import { BannerPlugin, Configuration } from 'webpack';

import generateBanner from './dev/generateBanner';

const config: Configuration = {
	mode: 'none',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.user.js',
	},
	plugins: [
		new BannerPlugin({
			banner: generateBanner,
			raw: true,
		}),
	],
};

export default config;
