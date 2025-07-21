import Template from "@/Layouts/Template";
import { Kecamatan, Kegiatan } from "@/types";
import axios from "axios";
import KegiatanForm from "../Form";

export default function Edit({kecamatans, kegiatan}: {kecamatans: Kecamatan[] , kegiatan: Kegiatan,}) {
    const fetchKelurahans = async (kecamatanId: number | string) => {
        const response = await axios.get(`/api/kelurahans/${kecamatanId}`);
        return response.data;
    };
    return (
        <Template title="Edit Kegiatan">
            <div className="container mx-auto p-3">
                <KegiatanForm
                initialValues={{
                    nama_kegiatan: kegiatan.nama_kegiatan,
                    tanggal_mulai: kegiatan.tanggal_mulai,
                    tanggal_akhir: kegiatan.tanggal_akhir,
                    kecamatan_id: kegiatan.kecamatan_id,
                    kelurahan_id: kegiatan.kelurahan_id,
                    rw: kegiatan.rw,
                    rt: kegiatan.rt,
                }}
                submitUrl={route('kegiatan.store')}
                kecamatans={kecamatans}
                kelurahansByKecamatan={fetchKelurahans}
                />
            </div>
        </Template>
    )
}