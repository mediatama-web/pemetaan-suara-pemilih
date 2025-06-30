import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Template from "@/Layouts/Template";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function Create() {
    const { data, setData, post, processing, reset , errors} = useForm({
        nama: '',
        status: 'korlap',
        alamat: '',
        no_hp: '',
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9+()-\s]/g, '');
        setData("no_hp",value);
    };

    const handlerSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('korlap.store'), {
            onFinish: () => reset(),
        });
    }
    return (
        <Template title="Tambah Korlap">
            <div className="container mx-auto p-3">
                <Link href="/korlap" className="inline-flex items-center p-2 mb-4 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4"/>
                </Link>
                <form onSubmit={handlerSimpan} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                        <Input 
                        type="text" onChange={(e) => setData('nama', e.target.value)} 
                        placeholder="Nama" 
                        name="nama" 
                        className={`${errors.nama ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.nama} className="mt-2 text-red-600" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea 
                        onChange={(e) => setData('alamat', e.target.value)} 
                        placeholder="Alamat" 
                        name="alamat" 
                        className={`${errors.alamat ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.alamat} className="mt-2 text-red-600" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="no hp" className="block text-sm font-medium text-gray-700">No Telpon</label>
                        <Input 
                            type="tel" 
                            value={data.no_hp}
                            onChange={handleChange} 
                            placeholder="No Telpon" 
                            name="no_hp" 
                            className={`${errors.no_hp ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.no_hp} className="mt-2 text-red-600" />
                    </div>
                    <Button disabled={processing} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </Template>
    )
}