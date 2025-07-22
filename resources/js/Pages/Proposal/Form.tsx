import { useForm } from '@inertiajs/react';
import React from 'react';

interface ProposalFormProps {
  initialValues: {
    nama_penanggung_jawab: string;
    tanggal_masuk: string;
    judul_proposal: string;
    file_proposal: string;
  };
  submitUrl: string;
  method?: 'post' | 'put';
}

const ProposalForm: React.FC<ProposalFormProps> = ({
  initialValues,
  submitUrl,
  method = 'post',
}) => {
  const { data, setData, submit, processing, errors, reset } = useForm(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submit(method, submitUrl, {
      forceFormData: true, // karena ada file
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="block font-medium">Nama Penanggung Jawab</label>
        <input
          type="text"
          value={data.nama_penanggung_jawab}
          onChange={(e) => setData('nama_penanggung_jawab', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          placeholder="Nama Penanggung Jawab"
        />
        {errors.nama_penanggung_jawab && <p className="text-red-500 text-sm">{errors.nama_penanggung_jawab}</p>}
      </div>

      <div>
        <label className="block font-medium">Tanggal Masuk</label>
        <input
          aria-label='tanggal masuk'
          type="date"
          value={data.tanggal_masuk}
          onChange={(e) => setData('tanggal_masuk', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.tanggal_masuk && <p className="text-red-500 text-sm">{errors.tanggal_masuk}</p>}
      </div>

      <div>
        <label className="block font-medium">Judul Proposal</label>
        <input
          type="text"
          value={data.judul_proposal}
          onChange={(e) => setData('judul_proposal', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          placeholder="Judul Proposal"
        />
        {errors.judul_proposal && <p className="text-red-500 text-sm">{errors.judul_proposal}</p>}
      </div>

      <div>
        <label className="block font-medium">File Proposal (Berupa Link G.Drive)</label>
        <input
          aria-label='file proposal'
          type="text"
          onChange={(e) => setData('file_proposal', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.file_proposal && <p className="text-red-500 text-sm">{errors.file_proposal}</p>}
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

export default ProposalForm;
