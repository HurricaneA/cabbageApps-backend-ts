import express from 'express';
import cors from 'cors';
import config from 'config';
import log from './logger';
import connect from './db/connect';
import taskroute from './routes/task.routes';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/tasks', taskroute);

app.listen(port, host, () => {
  log.info('server is listening on port 8000');

  connect();
});
