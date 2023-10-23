import express from 'express';
import bandaraRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', bandaraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

