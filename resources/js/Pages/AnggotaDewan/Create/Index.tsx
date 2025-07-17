import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Template from "@/Layouts/Template";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function Create() {
    const { data, setData, post, processing, reset , errors} = useForm({
        nama: '',
        posisi: ''
    });

    const handlerSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('anggotadewan.store'), {
            onFinish: () => reset(),
        });
    }
    return (
        <Template title="Tambah Anggota Dewan">
            <div className="container mx-auto p-3">
                <Link href="/anggotadewan" className="inline-flex items-center p-2 mb-4 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4"/>
                </Link>
                <form onSubmit={handlerSimpan} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                        <Input 
                        type="text" 
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)} 
                        placeholder="Nama" 
                        name="nama" 
                        className={`${errors.nama ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.nama} className="mt-2 text-red-600" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="no hp" className="block text-sm font-medium text-gray-700">Wilayah</label>
                        <select 
                            title="posisi"
                            
                            value={data.posisi}
                            onChange={(e) => setData('posisi', e.target.value)} 
                            name="no_hp" 
                            className={`${errors.posisi ? 'border-red-600' : ''} mt-1 block w-full p-1 border-gray-200 border rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                <option value="">-- PILIH ROLE --</option>
                                <option value="ri">RI</option>
                                <option value="prov">PROVINSI</option>
                                <option value="dpr">DPR</option>
                                <option value="dprd">DPRD</option>
                            </select>
                        <InputError message={errors.posisi} className="mt-2 text-red-600" />
                    </div>

                    <Button disabled={processing} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </Template>
    )
}