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
      const [rows] = await pool.query('SELECT * FROM v_bandara');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching bandara:', err);
      res.status(500).send('Server Error');
    }
  }
  async getBandarabyID(req, res) {
    try {
      const {id_bandara} = req.params;
      const [rows] = await pool.query('SELECT * FROM v_bandara WHERE id_bandara=(?)',[id_bandara]);
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
  async getMaskapai(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM v_maskapai');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching bandara:', err);
      res.status(500).send('Server Error');
    }
  }
  async getMaskapaibyID(req, res) {
    try {
      const {id_maskapai} = req.params;
      const [rows] = await pool.query('SELECT * FROM v_maskapai WHERE id_maskapai=(?)',[id_maskapai]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
  async getPenumpang(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM v_penumpang');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching bandara:', err);
      res.status(500).send('Server Error');
    }
  }
  async getPenumpangbyID(req, res) {
    try {
      const {id_penumpang} = req.params;
      const [rows] = await pool.query('SELECT * FROM v_penumpang WHERE id_penumpang=(?)',[id_penumpang]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  // bookings
  async tambahPesanan(req, res) {
    try {
      const { penerbangan_id,penumpang_id,tanggal_pemesanan,tanggal_penerbangan } = req.body;
      const [result] = await pool.query('CALL tambah_pesanan(?,?,?,?, @pesan)', [penerbangan_id,penumpang_id,tanggal_pemesanan,tanggal_penerbangan]);
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

  async getPesanan(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM v_bookings');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching bandara:', err);
      res.status(500).send('Server Error');
    }
  }
  async getPesananbyID(req, res) {
    try {
      const {booking_id} = req.params;
      const [rows] = await pool.query('SELECT * FROM v_bookings WHERE id_booking=(?)',[booking_id]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // penerbangan
  async tambahPenerbangan(req, res) {
    try {
      const { id_maskapai,id_bandara,id_bandara_tujuan,waktu_keberangkatan,waktu_kedatangan,durasi,kapasitas_kursi,harga } = req.body;
      const [result] = await pool.query('CALL tambah_penerbangan(?,?,?,?,?,?,?,?, @pesan)', [id_maskapai,id_bandara,id_bandara_tujuan,waktu_keberangkatan,waktu_kedatangan,durasi,kapasitas_kursi,harga]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error Menambah Pesanan:', err);
      res.status(500).send('Server Error');
    }
  }
  async perbaruiPenerbangan(req, res) {
    try {
      const { id_penerbangan,id_maskapai,id_bandara,id_bandara_tujuan,waktu_keberangkatan,waktu_kedatangan,durasi,kapasitas_kursi,harga } = req.body;
      const [result] = await pool.query('CALL perbarui_penerbangan(?,?,?,?,?,?,?,?,?, @pesan)', [id_penerbangan,id_maskapai,id_bandara,id_bandara_tujuan,waktu_keberangkatan,waktu_kedatangan,durasi,kapasitas_kursi,harga]);
      const [output] = await pool.query('SELECT @p_pesan AS pesan');
      res.json(output[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async hapusPenerbangan(req, res) {
    try {
      const {  id_penerbangan } = req.params;
      const [result] = await pool.query('CALL hapus_penerbangan(?, @pesan)', [id_penerbangan]);
      const [messageResult] = await pool.query('SELECT @pesan AS pesan');
      res.json(messageResult[0]);
    } catch (err) {
      console.error('Error deleting penumpang:', err);
      res.status(500).send('Server Error');
    }
  }
  async getPenerbangan(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM v_penerbangan');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching bandara:', err);
      res.status(500).send('Server Error');
    }
  }
  async getPenerbanganbyID(req, res) {
    try {
      const {id_penerbangan} = req.params;
      const [rows] = await pool.query('SELECT * FROM v_penerbangan WHERE id_penerbangan=(?)',[id_penerbangan]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
