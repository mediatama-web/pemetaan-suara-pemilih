import Template from "@/Layouts/Template";
import { Proposal } from "@/types";
import ProposalForm from "../Form";

export default function Edit({proposal}: {proposal: Proposal}) {
    return (
        <Template title="Edit Proposal">
            <div className="container mx-auto p-3">
            <ProposalForm
            initialValues={{
                nama_penanggung_jawab: proposal.nama_penanggung_jawab,
                tanggal_masuk: proposal.tanggal_masuk,
                judul_proposal: proposal.judul_proposal,
                file_proposal: proposal.file_proposal,
            }}
            submitUrl={route('proposal.update', proposal.id)}
            method="put"
            />
            </div>
        </Template>
    )
}