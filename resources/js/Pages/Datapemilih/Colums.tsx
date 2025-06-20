import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Datapemilih } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreVerticalIcon } from "lucide-react"
import Swal from 'sweetalert2'

export const columns: ColumnDef<Datapemilih>[] = [
    {
      header: "No",
      cell: ({ row }) => <span className="font-medium">{row.index + 1}</span>,
    },
    {
      accessorKey: "no_kk",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            No KK
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("no_kk")}</span>,
    },
    {
      accessorKey: "nik",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            NIK
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nik")}</span>,
    },
    {
      accessorKey: "nama",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama")}</span>,
    },
    {
      accessorKey: "alamat",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Alamat
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("alamat")}</span>,
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
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_kecamatan")}</span>,
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
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_kelurahan")}</span>,
    },
    {
      accessorKey: "nama_korlap",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama Korlap
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_korlap")}</span>,
    },
    {
      accessorKey: "nama_kormas",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama Kormas
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_kormas")}</span>,
    },
    {
      accessorKey: "no_hp",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            No HP
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("no_hp")}</span>,
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
        console.log("berhasil");
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
            console.log("berhasil");
        }
    })
}