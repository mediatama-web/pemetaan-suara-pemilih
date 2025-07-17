import { ChartAreaInteractive } from "@/Components/chart-area-interactive"
import { SectionCards } from "@/Components/section-cards"
import Template from "@/Layouts/Template"

export default function Page() {
  return (
    <Template title="Dashboard">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      {/* <DataTable data={data} /> */}
    </Template>
  )
}
