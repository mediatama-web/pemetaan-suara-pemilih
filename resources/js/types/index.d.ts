export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    alamat: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// deklarasikan untuk tipe data yang digunakan di seluruh aplikasi
export interface Kecamatan {
    id: number;
    nama_kecamatan: string;
    created_at: string;
    updated_at: string;
}

export interface Kelurahan {
    id: number;
    kecamatan_id: number;
    nama_kecamatan: string;
    nama_kelurahan: string;
    created_at: string;
    updated_at: string;
}

export interface Datapemilih {
    id: number;
    no_kk: number;
    nik: number;
    nama: string;
    alamat: string;
    rt: string;
    rw: string;
    kecamatan_id: number;
    nama_kecamatan: string;
    kelurahan_id: number;
    nama_kelurahan: string;
    nama_kormas: string;
    kormas_id: number;
    nama_korlap: string;
    korlap_id: number;
    tps: string;
    no_hp: number;
    created_at: string;
    updated_at: string;
}
