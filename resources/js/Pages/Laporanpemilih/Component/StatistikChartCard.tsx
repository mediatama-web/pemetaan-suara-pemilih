import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type StatItem = {
  label: string;
  total: number;
};

type ChartData = {
  kecamatan: StatItem[];
  kelurahan: StatItem[];
};

type Props = {
  chart: ChartData;
};

export default function StatistikChartCard({ chart }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Chart Kecamatan */}
      <div className="bg-white w-full shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Pemilih per Kecamatan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chart.kecamatan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3b82f6" name="Jumlah Pemilih" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Kelurahan */}
      <div className="bg-white w-full shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Pemilih per Kelurahan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chart.kelurahan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#10b981" name="Jumlah Pemilih" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
