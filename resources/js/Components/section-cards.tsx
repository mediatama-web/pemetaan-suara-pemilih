
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/Components/ui/card"

export function SectionCards({
  kecamatan,
  kelurahan,
  jumlahPemilih
} : {
  kecamatan: number,
  kelurahan: number,
  jumlahPemilih: number
}) {
  return (
    <div className="*:data-[slot=card]:shadow-xs xl/main:grid-cols-4 md/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Kecamatan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {kecamatan}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Kelurahan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {kelurahan}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pemilih</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {jumlahPemilih}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Tingkat pertumbuhan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            4.5%
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
