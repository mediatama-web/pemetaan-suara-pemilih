import { SectionCards } from "@/Components/section-cards";
import Template from "@/Layouts/Template";

export default function Index({
  kecamatan,
  kelurahan,
  proposal,
  kegiatan,
  jumlahPemilih
} : {
  kecamatan: number,
  kelurahan: number,
  proposal: number,
  kegiatan: number,
  jumlahPemilih: number
}) {
  return (
    <Template title="Dashboard">
      <SectionCards kecamatan={kecamatan} kelurahan={kelurahan} jumlahPemilih={jumlahPemilih} proposal={proposal} kegiatan={kegiatan} />
      {/* <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div> */}
    </Template>
  )
}
