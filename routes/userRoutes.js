import express from 'express';
import BandaraController from '../controllers/userController.js';

const router = express.Router();

router.post('/bandara', BandaraController.tambahBandara);
router.put('/bandara', BandaraController.perbaruiBandara);
router.delete('/bandara/:id_bandara', BandaraController.hapusBandara);
router.get('/bandara',BandaraController.getBandara);
router.get('/bandara/:id_bandara',BandaraController.getBandarabyID);

router.post('/maskapai', BandaraController.tambahMaskapai);
router.put('/maskapai', BandaraController.perbaruiMaskapai);
router.delete('/maskapai/:id_maskapai', BandaraController.hapusMaskapai);

router.post('/penumpang', BandaraController.tambahPenumpang);
router.put('/penumpang',BandaraController.perbaruiPenumpang);
router.delete('/penumpang/:id_penumpang', BandaraController.hapusPenumpang);

router.post('/pesanan',BandaraController.tambahPesanan)
router.delete('/pesanan/:booking_id',BandaraController.hapusPesanan)

router.get('/TertuaTermuda', BandaraController.getBandaratertuadantermuda);
router.get('/getMaskapai-info', BandaraController.maskapai_info);


export default router;
