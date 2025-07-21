import { Kecamatan } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface KegiatanFormProps {
  initialValues: {
    nama_kegiatan: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    kecamatan_id: string | number;
    kelurahan_id: string | number;
    rw: string;
    rt: string;
  };
  kecamatans: Kecamatan[];
  kelurahansByKecamatan: (kecamatanId: number | string) => Promise<{ id: number; nama_kelurahan: string }[]>;
  submitUrl: string;
  method?: 'post' | 'put';
}

const KegiatanForm: React.FC<KegiatanFormProps> = ({
  initialValues,
  kecamatans,
  kelurahansByKecamatan,
  submitUrl,
  method = 'post',
}) => {
  const { data, setData, submit, processing, errors } = useForm(initialValues);
  const [kelurahans, setKelurahans] = useState<{ id: number; nama_kelurahan: string }[]>([]);

  useEffect(() => {
    if (data.kecamatan_id) {
      kelurahansByKecamatan(data.kecamatan_id).then(setKelurahans);
    } else {
      setKelurahans([]);
    }
  }, [data.kecamatan_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(method, submitUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="block font-medium">Nama Kegiatan</label>
        <input
          aria-label='nama kegiatan'
          placeholder='Nama Kegiatan'
          type="text"
          value={data.nama_kegiatan}
          onChange={(e) => setData('nama_kegiatan', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.nama_kegiatan && <p className="text-red-500 text-sm">{errors.nama_kegiatan}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block font-medium">Tanggal Mulai</label>
          <input
            aria-label='tanggal mulai'
            type="date"
            value={data.tanggal_mulai}
            onChange={(e) => setData('tanggal_mulai', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.tanggal_mulai && <p className="text-red-500 text-sm">{errors.tanggal_mulai}</p>}
        </div>

        <div>
          <label className="block font-medium">Tanggal Akhir</label>
          <input
            aria-label='tanggal akhir'
            type="date"
            value={data.tanggal_akhir}
            onChange={(e) => setData('tanggal_akhir', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.tanggal_akhir && <p className="text-red-500 text-sm">{errors.tanggal_akhir}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block font-medium">Kecamatan</label>
          <select
            aria-label='kecamatan'
            value={data.kecamatan_id}
            onChange={(e) => setData('kecamatan_id', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          >
            <option value="">-- Pilih Kecamatan --</option>
            {kecamatans.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama_kecamatan}
              </option>
            ))}
          </select>
          {errors.kecamatan_id && <p className="text-red-500 text-sm">{errors.kecamatan_id}</p>}
        </div>

        <div>
          <label className="block font-medium">Kelurahan</label>
          <select
            aria-label='kelurahan'
            value={data.kelurahan_id}
            onChange={(e) => setData('kelurahan_id', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            disabled={!data.kecamatan_id}
          >
            <option value="">-- Pilih Kelurahan --</option>
            {kelurahans.map((kel) => (
              <option key={kel.id} value={kel.id}>
                {kel.nama_kelurahan}
              </option>
            ))}
          </select>
          {errors.kelurahan_id && <p className="text-red-500 text-sm">{errors.kelurahan_id}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block font-medium">RW</label>
          <input
            placeholder='RW'
            aria-label='rw'
            value={data.rw}
            onChange={(e) => setData('rw', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.rw && <p className="text-red-500 text-sm">{errors.rw}</p>}
        </div>

        <div>
          <label className="block font-medium">RT</label>
          <input
            placeholder='RT'
            aria-label='rt'
            value={data.rt}
            onChange={(e) => setData('rt', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.rt && <p className="text-red-500 text-sm">{errors.rt}</p>}
        </div>
      </div>


      <button
        type="submit"
        disabled={processing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {processing ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
};

export default KegiatanForm;
