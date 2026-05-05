import { type ColumnDef } from "@tanstack/react-table"
import type { Table } from "./tables.schema"
import { Button } from "#/components/ui/button"
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: "NO",
    header: "NO"
  },
  {
    accessorKey: "SKPD",
    header: "SKPD"
  },
  {
    accessorKey: "Uraian",
    header: "Uraian"
  },
  {
    accessorKey: "Spesifikasi",
    header: "Spesifikasi"
  },
  {
    accessorKey: "Satuan",
    header: "Satuan"
  },
  {
    accessorKey: "Harga",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Status",
    header: "Status"
  },
  {
    accessorKey: "Elemen",
    header: "Elemen"
  },

]
