import Template from "@/Layouts/Template";
import { Kelurahan, LaporanProps, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "./Colums";
import StatistikChartCard from "./Component/StatistikChartCard";
import StatistikGrid from "./Component/StatistikGrid";
import { DataTable } from "./Data-table";


export default function Index({
  data,
  filters,
  anggotaDewans,
  kecamatans,
  statistik,
  chart,
  auth
}: LaporanProps & { auth: PageProps['auth'] }) {
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

    const isSuperAdmin = auth?.user?.role === 'superadmin';
    return (
        <Template title="Laporan Pemilih">
            <div className="container mx-auto p-3">
                {/* Filter Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Filter Anggota Dewan - hanya untuk Super Admin */}
                    {isSuperAdmin && (
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Anggota Dewan
                        </label>
                        <select
                            aria-label="anggota_dewan_id"
                            value={formData.anggota_dewan_id}
                            onChange={(e) => setData('anggota_dewan_id', e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">-- Pilih Anggota Dewan --</option>
                            {anggotaDewans.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nama}
                            </option>
                            ))}
                        </select>
                        </div>
                    )}

                    {/* Kecamatan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kecamatan
                        </label>
                        <select
                        aria-label="kecamatan_id"
                        value={formData.kecamatan_id}
                        onChange={(e) => setData('kecamatan_id', e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        >
                        <option value="">-- Pilih Kecamatan --</option>
                        {kecamatans.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.nama_kecamatan}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Kelurahan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kelurahan
                        </label>
                        <select
                        aria-label="kelurahan_id"
                        value={formData.kelurahan_id}
                        onChange={(e) => setData('kelurahan_id', e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        >
                        <option value="">-- Pilih Kelurahan --</option>
                        {kelurahanList.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.nama_kelurahan}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* RT */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">RT</label>
                        <input
                        type="text"
                        placeholder="RT"
                        value={formData.rt}
                        onChange={(e) => setData('rt', e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {/* RW */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">RW</label>
                        <input
                        type="text"
                        placeholder="RW"
                        value={formData.rw}
                        onChange={(e) => setData('rw', e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {/* Tombol Tampilkan */}
                    <div className="flex items-end">
                        <button
                        type="button"
                        onClick={handleFilter}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                        >
                        Tampilkan
                        </button>
                    </div>
                </div>


                {/* statistic */}
                <StatistikGrid
                total_pemilih={statistik.total_pemilih}
                total_kecamatan={statistik.total_kecamatan}
                total_kelurahan={statistik.total_kelurahan}
                />

                {/* chart */}
                <StatistikChartCard chart={chart} />

                {/* Tabel Hasil */}
                <DataTable columns={columns} data={data} />

            </div>
        </Template>
    )
}