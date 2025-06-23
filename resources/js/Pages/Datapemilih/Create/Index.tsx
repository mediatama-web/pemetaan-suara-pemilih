import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import Template from "@/Layouts/Template";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

interface InputField {
  nik: string;
  nama: string;
}

interface KelurahanField {
    id: number;
    nama_kelurahan: string;
}

export default function Create({kecamatans, kelurahans, korlaps, kormas} : {
    kecamatans: { id: number; nama_kecamatan: string }[],
    kelurahans: { id: number; kecamatan_id: number; nama_kelurahan: string }[],
    korlaps: { id: number; nama: string }[],
    kormas: { id: number; nama: string }[],
}) {
    const [selectedKelurahan, setSelectedKelurahan] = useState<KelurahanField[]>([]);
    const { data, setData, post, processing, reset , errors} = useForm({
        no_kk: '',
        alamat: '',
        kecamatan_id: '',
        kelurahan_id: '',
        rw: '',
        rt: '',
        tps: '',
        no_hp: '',
        korlap_id: '',
        kormas_id: '',
        anggota: [{ nik: '', nama: '' }]
    });

    const [fields, setFields] = useState<InputField[]>([
        { nik: '', nama: '' }
    ]);
    
    const handlerFilterKelurahan = (id: string) => {
        setData('kecamatan_id', id);
        const filtered = kelurahans.filter(kel => kel.kecamatan_id === Number(id));
        setSelectedKelurahan(filtered);
    }

    const handleChange = (
        index: number,
        field: keyof InputField,
        value: string
    ) => {
        const updatedFields = [...fields]
        updatedFields[index][field] = value
        setFields(updatedFields)
    }

    const handleAdd = () => {
        setFields([...fields, { nik: '', nama: '' }])
    }

    const handleRemove = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index)
        setFields(newFields)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(JSON.stringify(fields, null, 2))
    }

    const handlerSimpan = (e: React.FormEvent) => {
        e.preventDefault();

        setData('anggota', fields);
        post(route('datapemilih.store'), {
            onFinish: () => {
                setFields([{ nik: '', nama: '' }]);
                reset();
            },
        })
    }


    return (
        <Template title="Tambah Data Pemilih">
            <div className="container mx-auto p-3">
                <Link href="/datapemilih" className="inline-flex items-center p-2 mb-4 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4"/>
                </Link>
                <form onSubmit={handlerSimpan} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="mb-4">
                            <label htmlFor="no_kk" className="block text-sm font-medium text-gray-700">No Kartu Keluarga</label>
                            <Input type="text" onChange={(e) => setData('no_kk', e.target.value)} placeholder="Masukan Nomor Kartu Keluarga" name="no_kk" className={`${errors.no_kk ? 'border-red-600' : ''} mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                            <InputError message={errors.no_kk} className="mt-2 text-red-600" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                            <Input type="text" onChange={(e) => setData('alamat', e.target.value)} placeholder="Alamat" name="alamat" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">Nama Kecamatan</label>
                            <select onChange={(e) => handlerFilterKelurahan(e.target.value)} aria-label="Pilih Kecamatan" id="kecamatan_id" name="kecamatan_id" className={`mt-1 block w-full border border-gray-200 text-sm text-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                <option value="">--Pilih Kecamatan --</option>
                                {
                                    kecamatans.map((kecamatan, index) => (
                                        <option key={index} value={kecamatan.id}>{kecamatan.nama_kecamatan}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Kelurahan</label>
                            <select aria-label="Pilih Kelurahan" id="kelurahan_id" name="kelurahan_id" className={`mt-1 block w-full border border-gray-200 text-sm text-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                <option value="">--Pilih Kelurahan --</option>
                                {
                                    selectedKelurahan.map((kelurahan, index) => (
                                        <option key={index} value={kelurahan.id}>{kelurahan.nama_kelurahan}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="mb-4">
                            <label htmlFor="rw" className="block text-sm font-medium text-gray-700">RW</label>
                            <Input type="text" onChange={(e) => setData('rw', e.target.value)} placeholder="RW" name="rw" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rt" className="block text-sm font-medium text-gray-700">RT</label>
                            <Input type="text" onChange={(e) => setData('rt', e.target.value)} placeholder="RT" name="rt" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tps" className="block text-sm font-medium text-gray-700">TPS</label>
                            <Input type="text" onChange={(e) => setData('tps', e.target.value)} placeholder="TPS" name="tps" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="mb-4">
                            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">Nama Korlap</label>
                            <select aria-label="Pilih Korlap" id="korlap_id" name="korlap_id" onChange={(e) => setData('korlap_id', e.target.value)} className={`mt-1 block w-full border border-gray-200 text-sm text-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                <option value="">--Pilih Korlap --</option>
                                {korlaps.map((korlap) => (
                                    <option key={korlap.id} value={korlap.id}>{korlap.nama}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Kormas</label>
                            <select aria-label="Pilih Kormas" id="kormas_id" name="kormas_id" className={`mt-1 block w-full border border-gray-200 text-sm text-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}>
                                <option value="">--Pilih Kormas --</option>
                                {kormas.map((kormas) => (
                                    <option key={kormas.id} value={kormas.id}>{kormas.nama}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tps" className="block text-sm font-medium text-gray-700">Nomor HP</label>
                            <Input type="text" onChange={(e) => setData('no_hp', e.target.value)} placeholder="Nomor HP" name="no_hp" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex justify-end mb-4">
                        <Button type="button" onClick={handleAdd}>
                            <Plus className="w-4 h-4 mr-2" /> Tambah Input
                        </Button>
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                                    <Input type="text" value={field.nik} onChange={(e) => handleChange(index, 'nik', e.target.value)} placeholder="NIK" name="nik" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                                    <Input type="text" value={field.nama} onChange={(e) => handleChange(index, 'nama', e.target.value)} placeholder="Nama" name="nama" className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50`} />
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <Button type="button" onClick={() => handleRemove(index)} disabled={fields.length === 1}>
                                    Hapus
                                </Button>
                            </div>
                        </div>
                    ))}
                    
                    <Button disabled={processing} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4">
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </Template>
    )
}