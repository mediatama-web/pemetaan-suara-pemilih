import Template from '@/Layouts/Template';
import { formatIndoDate } from '@/lib/helper';
import { Pie } from 'react-chartjs-2'; // atau ganti dengan formatter kamu
import FilterForm from './Component/FilterForm';

import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  kegiatanList: {
    id: number
    nama_kegiatan: string
    tanggal_mulai: string
    tanggal_akhir: string
    jumlah_hadir: number
    jumlah_tidak_hadir: number
  }[]
  kecamatans: any[]
  kelurahans: any[]
  filters: {
    kecamatan_id?: string | number
    kelurahan_id?: string | number
  }
}

const Index = ({ kegiatanList, kecamatans, kelurahans, filters }: Props) => {
  return (
    <Template title="Laporan Kegiatan">
        <div className="container mx-auto p-3">
            <FilterForm kecamatans={kecamatans} kelurahans={kelurahans} initialFilters={filters} />

            {kegiatanList.length === 0 ? (
                <div className="text-center text-gray-500 py-12 font-medium">
                Belum ada kegiatan yang tersedia.
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6 mt-5">
                {kegiatanList.map((kegiatan) => {
                    const pieData = {
                        labels: ['Hadir', 'Tidak Hadir'],
                        datasets: [
                            {
                                data: [kegiatan.jumlah_hadir, kegiatan.jumlah_tidak_hadir],
                                backgroundColor: ['#4ade80', '#f87171'],
                            },
                        ],
                    }

                    return (
                    <div key={kegiatan.id} className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold text-blue-700 mb-1">{kegiatan.nama_kegiatan}</h2>
                        <p className="text-sm text-gray-500 mb-3">
                        {formatIndoDate(kegiatan.tanggal_mulai)} s.d {formatIndoDate(kegiatan.tanggal_akhir)}
                        </p>

                        <Pie data={pieData} />

                        <div className="mt-4 text-sm text-gray-700">
                        <p>Jumlah Hadir: <strong>{kegiatan.jumlah_hadir}</strong></p>
                        <p>Jumlah Tidak Hadir: <strong>{kegiatan.jumlah_tidak_hadir}</strong></p>
                        </div>
                    </div>
                    )
                })}
                </div>
            )}
        </div>
    </Template>
  )
}

export default Index
