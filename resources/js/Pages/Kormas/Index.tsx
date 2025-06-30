import Template from "@/Layouts/Template";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Kormas({kormas} : {kormas: any[]}) {
    return (
        <Template title="Kormas">
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={kormas} />
            </div>
        </Template>
    )
}