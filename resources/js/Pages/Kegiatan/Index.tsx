import Template from "@/Layouts/Template";
import { Kegiatan } from "@/types";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Index({kegiatan} : {kegiatan : Kegiatan[]}) {
    return (
        <Template title="Data Kegiatan">
            <div className="container mx-auto p-3">
                <DataTable data={kegiatan} columns={columns} />
            </div>
        </Template>
    )
}