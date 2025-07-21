import Template from "@/Layouts/Template";
import { useForm } from "@inertiajs/react";

export type AbsenProps = {
  kegiatan: {
    id: number
    nama_kegiatan: string
  }
  absenList: {
    id: number
    nik: string
    nama: string
    waktu: string
  }[]
}
export default function Index({ kegiatan, absenList }: AbsenProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        kegiatan_id: kegiatan.id,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('kegiatan.absen.store'), {
            preserveScroll: true,
             onSuccess: () => {
                setData('nik', '')
            },
        })
    }
    return (
        <Template title="Entry Kegiatan">
            <div className="container mx-auto p-3">
                <h1 className="text-xl font-semibold mb-4 flex md:flex-row flex-col">Absen Kegiatan: <span className="italic text-yellow-500">{kegiatan.nama_kegiatan}</span></h1>

                <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="flex-1">
                        <label htmlFor="nik" className="block text-sm font-medium text-gray-700 mb-1">
                            NIK Pemilih
                        </label>
                        <input
                            id="nik"
                            type="text"
                            value={data.nik}
                            onChange={e => setData('nik', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Masukkan NIK pemilih"
                            autoFocus
                            required
                        />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                Simpan Absen
                            </button>
                        </div>
                    </div>
                    {errors.nik && (
                        <p className="text-sm text-red-600 mt-1">{errors.nik}</p>
                    )}
                </form>

                <div className="overflow-x-auto">
                    <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="border p-2">#</th>
                        <th className="border p-2">NIK</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Waktu Absen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absenList.length > 0 ? (
                        absenList.map((absen, index) => (
                            <tr key={absen.id}>
                            <td className="border p-2 text-center">{index + 1}</td>
                            <td className="border p-2">{absen.nik}</td>
                            <td className="border p-2">{absen.nama}</td>
                            <td className="border p-2">{absen.waktu}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={4} className="border p-4 text-center text-gray-500">
                            Belum ada peserta yang absen
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </Template>
    )
}