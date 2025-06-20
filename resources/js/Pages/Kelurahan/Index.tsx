import Template from "@/Layouts/Template";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Kelurahan({kelurahans}: {kelurahans: any[]}) {
    return (
        <Template title="Kelurahan">
            <div className="container mx-auto py-10 p-3">
                <DataTable columns={columns} data={kelurahans} />
            </div>
        </Template>
    );
}