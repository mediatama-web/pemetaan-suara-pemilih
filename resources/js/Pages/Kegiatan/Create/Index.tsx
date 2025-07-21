import Template from "@/Layouts/Template";
import { Kecamatan } from "@/types";
import axios from "axios";
import KegiatanForm from "../Form";

export default function Create({kecamatans}: {kecamatans: Kecamatan[]}) {
    const fetchKelurahans = async (kecamatanId: number | string) => {
        const response = await axios.get(route('api.kelurahan'), {
                params: { kecamatan_id: kecamatanId },
            })
        return response.data;
    };
    return (
        <Template title="Tambah Kegiatan">
            <div className="container mx-auto p-3">
                <KegiatanForm
                initialValues={{
                    nama_kegiatan: '',
                    tanggal_mulai: '',
                    tanggal_akhir: '',
                    kecamatan_id: '',
                    kelurahan_id: '',
                    rw: '',
                    rt: '',
                }}
                submitUrl={route('kegiatan.store')}
                kecamatans={kecamatans}
                kelurahansByKecamatan={fetchKelurahans}
                />
            </div>
        </Template>
    )
}