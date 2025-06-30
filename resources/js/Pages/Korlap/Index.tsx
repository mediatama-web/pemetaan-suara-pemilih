import Template from "@/Layouts/Template";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Korlap({korlap} : {korlap: any[]}) {
    return (
        <Template title="Korlap">
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={korlap} />
            </div>
        </Template>
    )
}