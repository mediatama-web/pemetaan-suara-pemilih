import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Template from "@/Layouts/Template";
import { Kecamatan } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function Create({kecamatan} : { kecamatan: Kecamatan[] }) {
    const { data, setData, post, processing, reset , errors} = useForm({
        nama_kelurahan: '',
        kecamatan_id: 0
    });

    const handlerSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('kelurahan.store'), {
            onFinish: () =>{
                reset('kecamatan_id');
                reset('nama_kelurahan');
            },
        });
    }
    return (
        <Template title="Tambah Kelurahan">
            <div className="container mx-auto p-3">
                <Link href="/kelurahan" className="inline-flex items-center p-2 mb-4 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4"/>
                </Link>
                <form onSubmit={handlerSimpan} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="kecamatan_id" className="block text-sm font-medium text-gray-700">Nama Kecamatan</label>
                        <select 
                        onChange={(e) => setData('kecamatan_id', Number(e.target.value))} 
                        id="kecamatan_id" 
                        name="kecamatan_id" 
                        className={`${errors.kecamatan_id ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 border-gray-300 text-sm`}>
                            <option value="">Pilih Kecamatan</option>
                            {kecamatan.map((item) => (
                                <option key={item.id} value={item.id}>{item.nama_kecamatan}</option>
                            ))}
                        </select>
                        <InputError message={errors.kecamatan_id} className="mt-2 text-red-600" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nama_kelurahan" className="block text-sm font-medium text-gray-700">Nama Kelurahan</label>
                        <Input 
                        type="text" 
                        onChange={(e) => setData('nama_kelurahan', e.target.value)} 
                        placeholder="Nama Kelurahan" 
                        name="nama_kelurahan" 
                        className={`${errors.nama_kelurahan ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.nama_kelurahan} className="mt-2 text-red-600" />
                    </div>
                    <Button disabled={processing} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </Template>
    )
}