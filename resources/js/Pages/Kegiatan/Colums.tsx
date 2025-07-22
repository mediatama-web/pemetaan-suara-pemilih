import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { formatIndoDate } from "@/lib/helper"
import { Kegiatan } from "@/types"
import { router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { isAfter, isBefore, isWithinInterval, parseISO } from "date-fns"
import { ArrowUpDown, MoreVerticalIcon } from "lucide-react"
import Swal from 'sweetalert2'

export const columns: ColumnDef<Kegiatan>[] = [
    {
      header: "No",
      cell: ({ row }) => <span className="font-medium">{row.index + 1}</span>,
    },
    {
      accessorKey: "nama_kegiatan",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama Kegiatan
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_kegiatan")}</span>,
    },
    {
      accessorKey: "tanggal_mulai",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Tanggal Mulai
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => {
        const data = row.original
        return (
          <span className="font-medium">{formatIndoDate(data.tanggal_mulai)}</span>
        )
      },
    },
    {
      accessorKey: "tanggal_akhir",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Tanggal Akhir
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => {
        const data = row.original
        return (
          <span className="font-medium">{formatIndoDate(data.tanggal_akhir)}</span>
        )
      },
    },
    {
      accessorKey: "nama_kecamatan",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama Kecamatan
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => {
        const data = row.original
        return (
          <span className="font-medium">{data.kecamatan?.nama_kecamatan}</span>
        )
      }
    },
    {
      accessorKey: "nama_kelurahan",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama Kelurahan
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => {
        const data = row.original
 
        return (
          <span className="font-medium">{data.kelurahan?.nama_kelurahan}</span>
        )
      },
    },
    {
      accessorKey: "rw",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            RW
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("rw")}</span>,
    },
    {
      accessorKey: "rt",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            RT
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("rt")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status Kegiatan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        const today = new Date();
        const startDate = parseISO(data.tanggal_mulai);
        const endDate = parseISO(data.tanggal_akhir);

        let status = "";
        let textColor = "";

        if (isBefore(today, startDate)) {
          status = "Belum Berjalan";
          textColor = "text-yellow-500";
        } else if (isWithinInterval(today, { start: startDate, end: endDate })) {
          status = "Sedang Berjalan";
          textColor = "text-green-600";
        } else if (isAfter(today, endDate)) {
          status = "Telah Berakhir";
          textColor = "text-red-500";
        }

        return <span className={`font-semibold ${textColor}`}>{status}</span>;
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
      const data = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => EnryData(data.id)}>Entry Data</DropdownMenuItem>
            <DropdownMenuItem onClick={() => EditData(data.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => hapusData(data.id)}>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
export const hapusData = (id : number) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-blue-500",
      cancelButton: "bg-red-500"
    },
    buttonsStyling: true
  });

  swalWithBootstrapButtons.fire({
    title: "Apa kamu yakin?",
    text: "Anda akan menghapus data ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Tidak, Batalkan!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        router.delete(route('kegiatan.destroy', id), {
            preserveScroll: true,
        });
    }
  });
}
const EditData = (id : number) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "bg-blue-500",
            cancelButton: "bg-red-500"
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: "Apa kamu yakin?",
        text: "Anda akan mengedit data ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, edit!",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Tidak, Batalkan!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            router.get(route('kegiatan.edit', id), {
                preserveScroll: true,
            });
        }
    })
}

const EnryData = (id : number) => {
    router.get(route('kegiatan.absen', id));
}