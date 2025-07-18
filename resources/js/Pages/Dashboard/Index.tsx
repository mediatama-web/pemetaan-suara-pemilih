import { ChartAreaInteractive } from "@/Components/chart-area-interactive"
import { SectionCards } from "@/Components/section-cards"
import Template from "@/Layouts/Template"

export default function Index({
  kecamatan,
  kelurahan,
  jumlahPemilih
} : {
  kecamatan: number,
  kelurahan: number,
  jumlahPemilih: number
}) {
  return (
    <Template title="Dashboard">
      <SectionCards kecamatan={kecamatan} kelurahan={kelurahan} jumlahPemilih={jumlahPemilih} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </Template>
  )
}
