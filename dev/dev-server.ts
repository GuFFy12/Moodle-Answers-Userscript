import * as fs from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';

createServer((request: IncomingMessage, response: ServerResponse) => {
	response.end(fs.readFileSync('./dist/index.user.js'));
}).listen(9000);
