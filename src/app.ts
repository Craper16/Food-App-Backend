import * as dotenv from 'dotenv';
dotenv.config();
import express, {
  Request,
  Response,
  NextFunction,
  json,
  urlencoded,
} from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

import categoriesRoutes from './routes/categories';
import mealsRoutes from './routes/meals';
import upgradesRoutes from './routes/upgrades';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/categories', categoriesRoutes);
app.use('/meals', mealsRoutes);
app.use('/upgrades', upgradesRoutes);

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({ message: 'Endpoint not found' });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const { message } = error;
  res.status(500).json({ message: message || 'Internal server issues' });
});

connect(process.env.DB_URI!)
  .then(() => {
    console.log(`Server running on port ${process.env.PORT}`);
    app.listen(process.env.PORT || 8081);
  })
  .catch((error) => console.log(error));
