import Template from "@/Layouts/Template";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function DataPemilih({datapemilih} : {datapemilih: any[]}) {
    return (
        <Template title="Data Pemilih">
            <div className="container mx-auto py-10 p-3">
                <DataTable columns={columns} data={datapemilih} />
            </div>
        </Template>
    )
}