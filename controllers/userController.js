import pool from '../config/db.js';

class BandaraController {
  // bandara
  async tambahBandara(req, res) {
    try {
      const { nama, kota, negara, tahun_berdiri } = req.body;
      await pool.query('CALL tambah_bandara(?, ?, ?, ?, @pesan)', [nama, kota, negara, tahun_berdiri]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      res.status(500).send({error: err.message});
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
  async getBandarabyID(req, res) {
    try {
      const {id_bandara} = req.params;
      const [rows] = await pool.query('SELECT * FROM bandara WHERE id_bandara=(?)',[id_bandara]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  // maskapai
  async tambahMaskapai(req, res) {
    try {
      const { nama, negara_asal, tahun_pendirian } = req.body;
      const [result] = await pool.query('CALL tambah_maskapai(?, ?, ?, @id_maskapai, @pesan)', [nama, negara_asal, tahun_pendirian]);
      const [messageResult] = await pool.query('SELECT @id_maskapai AS id_maskapai, @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error adding maskapai:', err);
      res.status(500).send('Server Error');
    }
  }

  async perbaruiMaskapai(req, res) {
    try {
      const { id_maskapai, nama, negara_asal, tahun_pendirian } = req.body;
      const [result] = await pool.query('CALL perbarui_maskapai(?, ?, ?, ?, @pesan)', [id_maskapai, nama, negara_asal, tahun_pendirian]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error updating maskapai:', err);
      res.status(500).send('Server Error');
    }
  }

  async hapusMaskapai(req, res) {
    try {
      const { id_maskapai } = req.params;
      const [result] = await pool.query('CALL hapus_maskapai(?, @pesan)', [id_maskapai]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error deleting maskapai:', err);
      res.status(500).send('Server Error');
    }
  }
  // penumpang
  async tambahPenumpang(req, res) {
    try {
      const { nama } = req.body;
      const [result] = await pool.query('CALL tambah_penumpang(?, @pesan)', [nama]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error adding maskapai:', err);
      res.status(500).send('Server Error');
    }
  }
  async perbaruiPenumpang(req, res) {
    try {
      const { id_penumpang, nama} = req.body;
      const [result] = await pool.query('CALL perbarui_penumpang(?, ?,@p_pesan)', [id_penumpang, nama]);
      const [output] = await pool.query('SELECT @p_pesan AS pesan');
      res.json(output[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async hapusPenumpang(req, res) {
    try {
      const { id_penumpang } = req.params;
      const [result] = await pool.query('CALL hapus_penumpang(?, @pesan)', [id_penumpang]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error deleting penumpang:', err);
      res.status(500).send('Server Error');
    }
  }
  // bookings
  async tambahPesanan(req, res) {
    try {
      const { penerbangan_id,penumpang_id,tanggal_pemesanan,tanggal_penerbangan } = req.body;
      const [result] = await pool.query('CALL tambah_pesanan(?,?,?,? @pesan)', [penerbangan_id,penumpang_id,tanggal_pemesanan,tanggal_penerbangan]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error Menambah Pesanan:', err);
      res.status(500).send('Server Error');
    }
  }
  async perbaruiPesanan(req, res) {
    try {
      const { booking_id, penerbangan_id, penumpang_id, tanggal_pemesanan, tanggal_penerbangan } = req.body;
      const [result] = await pool.query('CALL perbarui_pesanan(?, ?, ?, ?, ?, @p_pesan)', [booking_id, penerbangan_id, penumpang_id, tanggal_pemesanan, tanggal_penerbangan]);
      const [output] = await pool.query('SELECT @p_pesan AS pesan');
      res.json(output[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async hapusPesanan(req, res) {
    try {
      const {  booking_id } = req.params;
      const [result] = await pool.query('CALL hapus_pesanan(?, @pesan)', [booking_id]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error deleting penumpang:', err);
      res.status(500).send('Server Error');
    }
  }

  // get dari view
  async getBandaratertuadantermuda(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM bandara_tertua_dan_termuda');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async maskapai_info(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM maskapai_info');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new BandaraController();
