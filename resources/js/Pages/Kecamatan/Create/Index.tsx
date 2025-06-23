import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Template from "@/Layouts/Template";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function Create() {
    const { data, setData, post, processing, reset , errors} = useForm({
        nama_kecamatan: ''
    });

    const handlerSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('kecamatan.store'), {
            onFinish: () => reset('nama_kecamatan'),
        });
    }
    return (
        <Template title="Tambah Kecamatan">
            <div className="container mx-auto p-3">
                <Link href="/kecamatan" className="inline-flex items-center p-2 mb-4 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4"/>
                </Link>
                <form onSubmit={handlerSimpan} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="nama_kecamatan" className="block text-sm font-medium text-gray-700">Nama Kecamatan</label>
                        <Input type="text" onChange={(e) => setData('nama_kecamatan', e.target.value)} placeholder="Nama Kecamatan" name="nama_kecamatan" className={`${errors.nama_kecamatan ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.nama_kecamatan} className="mt-2 text-red-600" />
                    </div>
                    <Button disabled={processing} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </Template>
    )
}