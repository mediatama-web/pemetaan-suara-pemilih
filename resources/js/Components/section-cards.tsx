
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/Components/ui/card"
import { Link } from "@inertiajs/react"
import { ArrowRightCircle } from "lucide-react"

export function SectionCards({
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
    <div className="*:data-[slot=card]:shadow-xs xl/main:grid-cols-5 md/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Kecamatan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <div className="flex justify-between">
              {kecamatan}
              <Link href="/kecamatan" className="text-xs"><ArrowRightCircle className="w-4 h-4" /></Link>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Kelurahan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <div className="flex justify-between">
              {kelurahan}
              <Link href="/kelurahan" className="text-xs"><ArrowRightCircle className="w-4 h-4" /></Link>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pemilih</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <div className="flex justify-between">
              {jumlahPemilih}
              <Link href="/datapemilih" className="text-xs"><ArrowRightCircle className="w-4 h-4" /></Link>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Proposal</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <div className="flex justify-between">
              {proposal}
              <Link href="/proposal" className="text-xs"><ArrowRightCircle className="w-4 h-4" /></Link>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Kegiatan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <div className="flex justify-between">
              {kegiatan}
              <Link href="/kegiatan" className="text-xs"><ArrowRightCircle className="w-4 h-4" /></Link>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
