import express from 'express';
import { sequelize } from '../src/pgConfig';
import {ADrouter} from './routes/AD';
import {Brouter} from './routes/B';
import {Crouter} from './routes/C';


const app = express();
const PORT =  3000;

app.use(express.json());
app.use('/api', ADrouter);
app.use('/api', Brouter);
app.use('/api', Crouter);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
