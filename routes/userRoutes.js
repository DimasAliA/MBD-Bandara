import express from 'express';
import BandaraController from '../controllers/userController.js';

const router = express.Router();

router.post('/tambahBandara', BandaraController.tambahBandara);
router.put('/perbaruiBandara', BandaraController.perbaruiBandara);
router.delete('/hapusBandara/:id_bandara', BandaraController.hapusBandara);
router.get('/getBandara',BandaraController.getBandara);

export default router;
