import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Proposal } from "@/types"
import { router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreVerticalIcon } from "lucide-react"
import Swal from 'sweetalert2'

export const columns: ColumnDef<Proposal>[] = [
    {
      header: "No",
      cell: ({ row }) => <span className="font-medium">{row.index + 1}</span>,
    },
    {
      accessorKey: "nama_penanggung_jawab",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Nama Penanggung Jawab
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("nama_penanggung_jawab")}</span>,
    },
    {
      accessorKey: "tanggal_masuk",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Tanggal Masuk
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("tanggal_masuk")}</span>,
    },
    {
      accessorKey: "judul_proposal",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Judul Proposal
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("judul_proposal")}</span>,
    },
    {
      accessorKey: "file_proposal",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            File Proposal
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => <span className="font-medium">{row.getValue("file_proposal")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const data = row.original;

        const handleStatusChange = (newStatus: "menunggu" | "diterima" | "ditolak") => {
          router.patch(route('proposal.update-status', data.id), {
            status: newStatus,
          }, {
            preserveScroll: true,
          });
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`capitalize text-xs px-2 py-1 ${data.status === 'diterima'
                  ? 'text-green-600 border-green-400'
                  : data.status === 'ditolak'
                  ? 'text-red-600 border-red-400'
                  : 'text-gray-600 border-gray-300'
                }`}
              >
                {data.status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange('menunggu')}>Menunggu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('diterima')}>Diterima</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('ditolak')}>Ditolak</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
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
        router.delete(route('proposal.destroy', id))
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
            router.get(route('proposal.edit', id))
        }
    })
}