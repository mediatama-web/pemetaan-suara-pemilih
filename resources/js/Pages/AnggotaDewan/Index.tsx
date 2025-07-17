import Template from "@/Layouts/Template";
import { DataTable } from "./Data-table";
import { columns } from "./Colums";
import { AnggotaDewan } from "@/types";

export default function Index({anggota_dewans}: {anggota_dewans: AnggotaDewan[]}) {
    return (
        <Template title="Anggota Dewan">
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={anggota_dewans} />
            </div>
        </Template>
    )
}