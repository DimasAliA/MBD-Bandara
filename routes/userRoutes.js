import express from 'express';
import BandaraController from '../controllers/userController.js';

const router = express.Router();

// bandara
router.post('/bandara', BandaraController.tambahBandara);
router.put('/bandara', BandaraController.perbaruiBandara);
router.delete('/bandara/:id_bandara', BandaraController.hapusBandara);
router.get('/bandara',BandaraController.getBandara);
router.get('/bandara/:id_bandara',BandaraController.getBandarabyID);

// maskapai
router.post('/maskapai', BandaraController.tambahMaskapai);
router.put('/maskapai', BandaraController.perbaruiMaskapai);
router.delete('/maskapai/:id_maskapai', BandaraController.hapusMaskapai);
router.get('/maskapai',BandaraController.getMaskapai);
router.get('/maskapai/:id_maskapai',BandaraController.getMaskapaibyID);

// penumpang
router.post('/penumpang', BandaraController.tambahPenumpang);
router.put('/penumpang',BandaraController.perbaruiPenumpang);
router.delete('/penumpang/:id_penumpang', BandaraController.hapusPenumpang);
router.get('/penumpang',BandaraController.getPenumpang);
router.get('/penumpang/:id_penumpang',BandaraController.getPenumpangbyID);

// booking
router.post('/pesanan',BandaraController.tambahPesanan);
router.put('/pesanan',BandaraController.perbaruiPesanan);
router.delete('/pesanan/:booking_id',BandaraController.hapusPesanan);
router.get('/pesanan',BandaraController.getPesanan);
router.get('/pesanan/:booking_id',BandaraController.getPesananbyID);

// penerbangan
router.post('/penerbangan',BandaraController.tambahPenerbangan);
router.put('/penerbangan',BandaraController.perbaruiPenerbangan);
router.delete('/penerbangan/:id_penerbangan',BandaraController.hapusPenerbangan);
router.get('/penerbangan',BandaraController.getPenerbangan);
router.get('/penerbangan/:id_penerbangan',BandaraController.getPenerbanganbyID);

router.get('/TertuaTermuda', BandaraController.getBandaratertuadantermuda);
router.get('/getMaskapai-info', BandaraController.maskapai_info);


export default router;
