import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Kelurahan } from "@/types"
import { router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreVerticalIcon } from "lucide-react"
import Swal from 'sweetalert2'

export const columns: ColumnDef<Kelurahan>[] = [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => <span className="font-medium">{row.index + 1}</span>,
    },
    {
      id: "nama_kecamatan",
      accessorKey: "nama_kecamatan",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Kecamatan
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
            Kelurahan
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_kelurahan")}</span>,
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
            {/* <DropdownMenuItem onClick={() => EditData(data.id)}>Edit</DropdownMenuItem> */}
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
        router.delete(route('kelurahan.destroy', id), {
            preserveScroll: true,
        });
    }
  });
}
// const EditData = (id : number) => {
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//             confirmButton: "bg-blue-500",
//             cancelButton: "bg-red-500"
//         },
//         buttonsStyling: true
//     })

//     swalWithBootstrapButtons.fire({
//         title: "Apa kamu yakin?",
//         text: "Anda akan mengedit data ini!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Ya, edit!",
//         confirmButtonColor: "#3085d6",
//         cancelButtonText: "Tidak, Batalkan!",
//         reverseButtons: true
//     }).then((result) => {
//         if (result.isConfirmed) {
//             router.get(route('kelurahan.edit', id), {
//                 preserveScroll: true,
//             });
//         }
//     })
// }