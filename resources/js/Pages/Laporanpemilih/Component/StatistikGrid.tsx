
type StatistikProps = {
  total_pemilih: number;
  total_kecamatan: number;
  total_kelurahan: number;
};

export default function StatistikGrid({
  total_pemilih,
  total_kecamatan,
  total_kelurahan,
}: StatistikProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-5">
      <div className="bg-blue-100 p-4 rounded shadow text-center">
        <h3 className="text-sm text-gray-600">Total Pemilih</h3>
        <p className="text-xl font-bold text-blue-700">{total_pemilih}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow text-center">
        <h3 className="text-sm text-gray-600">Total Kecamatan</h3>
        <p className="text-xl font-bold text-green-700">{total_kecamatan}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow text-center">
        <h3 className="text-sm text-gray-600">Total Kelurahan</h3>
        <p className="text-xl font-bold text-yellow-700">{total_kelurahan}</p>
      </div>
    </div>
  );
}
