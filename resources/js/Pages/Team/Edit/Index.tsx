import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Template from "@/Layouts/Template";
import { AnggotaDewan, Team } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function Edit({team, anggota_dewans} : {
    team: Team, 
    anggota_dewans: AnggotaDewan[],
}) {
    const { data, setData, put, processing, reset , errors} = useForm({
        name: team.name,
        email: team.email,
        password: '',
        password_confirmation: '',
        alamat: team.alamat,
        role: team.role,
        anggota_dewan_id: team.anggota_dewan_id
    });

    const handlerSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('team.update',), {
            onFinish: () => reset(),
        });
    }

    console.log(team);
    
    return (
        <Template title="Edit Team">
            <div className="container mx-auto p-3">
                <Link href="/team" className="inline-flex items-center p-2 mb-4 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4"/>
                </Link>
                <form onSubmit={handlerSimpan} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                        <Input 
                        type="text" onChange={(e) => setData('name', e.target.value)} 
                        placeholder="Nama" 
                        name="nama" 
                        value={data.name}
                        className={`${errors.name ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.name} className="mt-2 text-red-600" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="no hp" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input 
                            type="email" 
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)} 
                            placeholder="Email" 
                            name="no_hp" 
                            className={`${errors.email ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.email} className="mt-2 text-red-600" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="no hp" className="block text-sm font-medium text-gray-700">Password</label>
                        <Input 
                            type="password" 
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)} 
                            placeholder="Password" 
                            name="no_hp" 
                            className={`${errors.password ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.password} className="mt-2 text-red-600" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="no hp" className="block text-sm font-medium text-gray-700">Password Confirm</label>
                        <Input 
                            type="password" 
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)} 
                            placeholder="Password Confirm" 
                            name="no_hp" 
                            className={`${errors.password_confirmation ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.password_confirmation} className="mt-2 text-red-600" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea 
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)} 
                        placeholder="Alamat" 
                        name="nama" 
                        className={`${errors.alamat ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        <InputError message={errors.alamat} className="mt-2 text-red-600" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="no hp" className="block text-sm font-medium text-gray-700">Role</label>
                        <select 
                            title="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)} 
                            name="no_hp" 
                            className={`${errors.role ? 'border-red-600' : ''} mt-1 block w-full p-1 border-gray-200 border rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                <option value="">-- PILIH ROLE --</option>
                                <option value="superadmin">superadmin</option>
                                <option value="admin">admin</option>
                            </select>
                        <InputError message={errors.role} className="mt-2 text-red-600" />
                    </div>

                    {data.role === 'admin' && (
                        <div className="mb-4">
                            <label htmlFor="anggota_dewan_id" className="block text-sm font-medium text-gray-700">Anggota Dewan</label>
                            <select 
                                title="anggota_dewan_id"
                                value={data.anggota_dewan_id}
                                onChange={(e) => setData('anggota_dewan_id', e.target.value)} 
                                name="anggota_dewan_id" 
                                className={`${errors.anggota_dewan_id ? 'border-red-600' : ''} mt-1 block w-full p-1 border-gray-200 border rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                    <option value="">-- PILIH --</option>
                                    {
                                        anggota_dewans.map((anggota_dewan) => (
                                            <option key={anggota_dewan.id} value={anggota_dewan.id}>{anggota_dewan.nama}</option>
                                        ))
                                    }
                            </select>
                            <InputError message={errors.anggota_dewan_id} className="mt-2 text-red-600" />
                        </div>
                    )}
                    <Button disabled={processing} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </Template>
    )
}