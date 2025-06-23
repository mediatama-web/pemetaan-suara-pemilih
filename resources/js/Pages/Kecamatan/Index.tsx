import Template from "@/Layouts/Template";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Kecamatan({kecamatans} : {kecamatans: any[]}) {
    
    return (
        <Template title="Kecamatan">
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={kecamatans} />
            </div>
        </Template>
    );
}