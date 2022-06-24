import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Server is working');
});

app.listen(port, (): void => {
  console.log(`Server is working on http://localhost:${port}`);
});

export default app;
