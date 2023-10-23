import pool from '../config/db.js';

class BandaraController {
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
}

export default new BandaraController();
