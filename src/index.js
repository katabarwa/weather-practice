import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';

import { getWeather } from './controllers/weatherController.js';

const app = express();
const port = process.env.port || 3000;
const accessLogger = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
    ].join(' ');
});

// set up logger
app.use(accessLogger)

app.get('/', (req, res) => res.send('Nothing here yet!'));
app.get('/weather', async (req, res) => {
    res.json(await getWeather());
});

app.listen(
    port,
    () => console.log(`Ready on port ${port}!`)
);
