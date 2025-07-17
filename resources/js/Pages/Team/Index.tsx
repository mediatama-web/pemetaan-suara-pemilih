import Template from "@/Layouts/Template";
import { columns } from "./Colums";
import { DataTable } from "./Data-table";

export default function Team({users}: {users: any}) {
    console.log(users);
    
    return (
        <Template title="Team">
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={users} />
            </div>
        </Template>
    )
}