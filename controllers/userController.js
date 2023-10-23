import pool from '../config/db.js';

class BandaraController {
  // bandara
  async tambahBandara(req, res) {
    try {
      const { id_bandara,nama, kota, negara, tahun_berdiri } = req.body;
      const [result] = await pool.query('CALL tambah_bandara(?,?, ?, ?, ?, @p_pesan)', [id_bandara,nama, kota, negara, tahun_berdiri]);
      const [output] = await pool.query('SELECT @p_pesan AS pesan');
      res.json(output[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async perbaruiBandara(req, res) {
    try {
      const { id_bandara, nama, kota, negara, tahun_berdiri } = req.body;
      const [result] = await pool.query('CALL perbarui_bandara(?, ?, ?, ?, ?, @p_pesan)', [id_bandara, nama, kota, negara, tahun_berdiri]);
      const [output] = await pool.query('SELECT @p_pesan AS pesan');
      res.json(output[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async hapusBandara(req, res) {
    try {
      const { id_bandara } = req.params;
      const [result] = await pool.query('CALL hapus_bandara(?, @p_pesan)', [id_bandara]);
      const [output] = await pool.query('SELECT @p_pesan AS pesan');
      res.json(output[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getBandara(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM bandara');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching bandara:', err);
      res.status(500).send('Server Error');
    }
  }
  // maskapai
  async tambahMaskapai(req, res) {
    try {
      const { nama, negara_asal, tahun_pendirian } = req.body;
      const [result] = await db.query('CALL tambah_maskapai(?, ?, ?, @id_maskapai, @pesan)', [nama, negara_asal, tahun_pendirian]);
      const [messageResult] = await db.query('SELECT @id_maskapai AS id_maskapai, @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error adding maskapai:', err);
      res.status(500).send('Server Error');
    }
  }

  async perbaruiMaskapai(req, res) {
    try {
      const { id_maskapai, nama, negara_asal, tahun_pendirian } = req.body;
      const [result] = await db.query('CALL perbarui_maskapai(?, ?, ?, ?, @pesan)', [id_maskapai, nama, negara_asal, tahun_pendirian]);
      const [messageResult] = await db.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error updating maskapai:', err);
      res.status(500).send('Server Error');
    }
  }

  async hapusMaskapai(req, res) {
    try {
      const { id_maskapai } = req.params;
      const [result] = await db.query('CALL hapus_maskapai(?, @pesan)', [id_maskapai]);
      const [messageResult] = await db.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error deleting maskapai:', err);
      res.status(500).send('Server Error');
    }
  }
}

export default new BandaraController();
