import Template from "@/Layouts/Template";
import ProposalForm from "../Form";

export default function Create() {
    return (
        <Template title="Tambah Proposal">
            <div className="container mx-auto p-3">
                <ProposalForm
                initialValues={{
                    nama_penanggung_jawab: '',
                    tanggal_masuk: '',
                    judul_proposal: '',
                    file_proposal: '',
                }}
                submitUrl={route('proposal.store')}
                method="post"
                />
            </div>
        </Template>
    )
}