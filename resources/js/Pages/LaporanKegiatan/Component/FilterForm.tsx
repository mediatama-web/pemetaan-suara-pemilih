import { Kecamatan, Kelurahan } from '@/types'
import { useForm } from '@inertiajs/react'
import React from 'react'

interface Props {
  kecamatans: Kecamatan[]
  kelurahans: Kelurahan[]
  initialFilters?: {
    kecamatan_id?: string | number
    kelurahan_id?: string | number
  }
}

const FilterForm: React.FC<Props> = ({ kecamatans, kelurahans, initialFilters }) => {
  const { data, setData, get } = useForm({
    kecamatan_id: initialFilters?.kecamatan_id || '',
    kelurahan_id: initialFilters?.kelurahan_id || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    get(route('laporankegiatan.index'), {
      preserveScroll: true,
    })
  }

  // Filter kelurahan berdasarkan kecamatan_id yang dipilih
  const filteredKelurahans = data.kecamatan_id
    ? kelurahans.filter((k) => k.kecamatan_id === parseInt(String(data.kecamatan_id)))
    : kelurahans

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1">
        <label className="block text-sm text-gray-700 mb-1">Kecamatan</label>
        <select
        aria-label='kecamatan'
        value={data.kecamatan_id}
        onChange={(e) => {
        setData('kecamatan_id', e.target.value)
        setData('kelurahan_id', '') // Reset kelurahan jika kecamatan berganti
        }}
        className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Semua Kecamatan --</option>
          {kecamatans.map((kecamatan) => (
            <option key={kecamatan.id} value={kecamatan.id}>
              {kecamatan.nama_kecamatan}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm text-gray-700 mb-1">Kelurahan</label>
        <select
        aria-label='kelurahan'
        value={data.kelurahan_id}
        onChange={(e) => setData('kelurahan_id', e.target.value)}
        className="w-full border rounded px-3 py-2"
        disabled={!data.kecamatan_id}
        >
          <option value="">-- Semua Kelurahan --</option>
          {filteredKelurahans.map((kelurahan) => (
            <option key={kelurahan.id} value={kelurahan.id}>
              {kelurahan.nama_kelurahan}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Filter
      </button>
    </form>
  )
}

export default FilterForm
