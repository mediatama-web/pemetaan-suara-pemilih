import Template from "@/Layouts/Template";
import { Kelurahan, LaporanProps } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import StatistikChartCard from "./Component/StatistikChartCard";
import StatistikGrid from "./Component/StatistikGrid";


export default function Index({
  data,
  filters,
  anggotaDewans,
  kecamatans,
  statistik,
  chart
}: LaporanProps) {
    const { get, setData, data: formData } = useForm({
        anggota_dewan_id: filters.anggota_dewan_id || '',
        kecamatan_id: filters.kecamatan_id || '',
        kelurahan_id: filters.kelurahan_id || '',
        rt: filters.rt || '',
        rw: filters.rw || '',
    });
    const handleFilter = () => {
        get(route('laporanpemilih.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const [kelurahanList, setKelurahanList] = useState<Kelurahan[]>([]);

    // Saat pertama kali load atau saat kecamatan dipilih
    useEffect(() => {
    if (formData.kecamatan_id) {
        axios
        .get(route('api.kelurahan'), {
            params: { kecamatan_id: formData.kecamatan_id },
        })
        .then((response) => {
            setKelurahanList(response.data);
        });
    } else {
        setKelurahanList([]);
        setData('kelurahan_id', '');
    }
    }, [formData.kecamatan_id]);
    return (
        <Template title="Laporan Pemilih">
            <div className="container mx-auto p-3">
                {/* Filter Form */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <select
                    aria-label="anggota_dewan_id"
                    value={formData.anggota_dewan_id}
                    onChange={(e) => setData('anggota_dewan_id', e.target.value)}
                    className="border p-2 rounded"
                    >
                    <option value="">-- Pilih Anggota Dewan --</option>
                    {anggotaDewans.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.nama}
                        </option>
                    ))}
                    </select>

                    <select
                    aria-label="kecamatan_id"
                    value={formData.kecamatan_id}
                    onChange={(e) => setData('kecamatan_id', e.target.value)}
                    className="border p-2 rounded"
                    >
                    <option value="">-- Pilih Kecamatan --</option>
                    {kecamatans.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.nama_kecamatan}
                        </option>
                    ))}
                    </select>

                    <select
                    aria-label="kelurahan_id"
                    value={formData.kelurahan_id}
                    onChange={(e) => setData('kelurahan_id', e.target.value)}
                    className="border p-2 rounded"
                    >
                    <option value="">-- Pilih Kelurahan --</option>
                    {kelurahanList.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.nama_kelurahan}
                        </option>
                    ))}
                    </select>

                    <input
                    type="text"
                    placeholder="RT"
                    value={formData.rt}
                    onChange={(e) => setData('rt', e.target.value)}
                    className="border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="RW"
                    value={formData.rw}
                    onChange={(e) => setData('rw', e.target.value)}
                    className="border p-2 rounded"
                    />

                    <button
                    type="button"
                    onClick={handleFilter}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                    Tampilkan
                    </button>
                </div>

                {/* statistic */}
                <StatistikGrid
                total_pemilih={statistik.total_pemilih}
                total_kecamatan={statistik.total_kecamatan}
                total_kelurahan={statistik.total_kelurahan}
                />

                {/* Tabel Hasil */}
                <div className="overflow-x-auto">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="min-w-full border">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                            <th className="border px-2 py-1 bg-gray-100">NIK</th>
                            <th className="border px-2 py-1 bg-gray-100">Nama</th>
                            <th className="border px-2 py-1 bg-gray-100">Kecamatan</th>
                            <th className="border px-2 py-1 bg-gray-100">Kelurahan</th>
                            <th className="border px-2 py-1 bg-gray-100">RT/RW</th>
                            <th className="border px-2 py-1 bg-gray-100">TPS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((warga) => (
                            <tr key={warga.id}>
                                <td className="border px-2 py-1">{warga.nik}</td>
                                <td className="border px-2 py-1">{warga.nama || '-'}</td>
                                <td className="border px-2 py-1">{warga.kecamatan?.nama_kecamatan || '-'}</td>
                                <td className="border px-2 py-1">{warga.kelurahan?.nama_kelurahan || '-'}</td>
                                <td className="border px-2 py-1 text-center">
                                {warga.rt}/{warga.rw}
                                </td>
                                <td className="border px-2 py-1 text-center">{warga.tps}</td>
                            </tr>
                            ))}
                            {data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center p-4">
                                Data tidak ditemukan
                                </td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                </div>

                {/* chart */}
                <StatistikChartCard chart={chart} />

            </div>
        </Template>
    )
}