export interface User {
    id: number;
    name: string;
    email: string;
    alamat: string;
    role: string;
    anggota_dewan_id?: number | null;
    anggota_dewan?: AnggotaDewan | null;
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

export type StatistikProps = {
  total_pemilih: number;
  total_kecamatan: number;
  total_kelurahan: number;
}

export type StatItem = {
  label: string;
  total: number;
};

export type Chart = {
    kecamatan : StatItem[]
    kelurahan : StatItem[]
}

export type LaporanProps = {
  data: any[];
  filters: any;
  anggotaDewans: { id: number; nama: string }[];
  kecamatans: Kecamatan[];
  statistik: StatistikProps;
  chart: Chart;
};

export interface Datapemilih {
    id: number;
    no_kk: number;
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

export type Team = {
    id: number,
    name: string,
    email: string,
    alamat: string,
    role: string,
    anggota_dewan_id: string
} 

export type AnggotaDewan = {
    id: number;
    nama: string;
    posisi: 'ri' | 'prov' | 'dpr' | 'dprd' | string;
    created_at: string;
    updated_at: string;
} 

export type Kegiatan = {
    id: number;
    user_id: number;
    nama_kegiatan: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    kecamatan_id: number;
    kelurahan_id: number;
    rw: string;
    rt: string;
    kelurahan: Kelurahan;
    kecamatan: Kecamatan;
    created_at: string;
    updated_at: string;
}