import Template from "@/Layouts/Template";
import { Proposal } from "@/types";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Index({proposal} : {proposal : Proposal[]}) {
    return (
        <Template title="Proposal">
            <div className="container mx-auto p-3">
                <DataTable data={proposal} columns={columns} />
            </div>
        </Template>
    )
}