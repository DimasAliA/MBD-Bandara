import express from 'express';
import BandaraController from '../controllers/userController.js';

const router = express.Router();

router.post('/tambahBandara', BandaraController.tambahBandara);
router.put('/perbaruiBandara', BandaraController.perbaruiBandara);
router.delete('/hapusBandara/:id_bandara', BandaraController.hapusBandara);
router.get('/getBandara',BandaraController.getBandara);
router.get('/getBandara/:id_bandara',BandaraController.getBandarabyID);


router.post('/tambahMaskapai', BandaraController.tambahMaskapai);
router.put('/perbaruiMaskapai', BandaraController.perbaruiMaskapai);
router.delete('/hapusMaskapai/:id_maskapai', BandaraController.hapusMaskapai);

router.post('/tambahPenumpang', BandaraController.tambahPenumpang);
router.put('/perbaruiPenumpang',BandaraController.perbaruiPenumpang);
router.delete('/hapusPenumpang/:id_penumpang', BandaraController.hapusPenumpang);

router.get('/TertuaTermuda', BandaraController.getBandaratertuadantermuda);
router.get('/getMaskapai-info', BandaraController.maskapai_info);


export default router;
