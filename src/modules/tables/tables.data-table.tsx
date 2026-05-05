import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "#/components/ui/table"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState } from "@tanstack/react-table"
import { Search } from "lucide-react" // Pastikan install lucide-react
import React from "react"
import {
  type VisibilityState
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    "SKPD": false,
    "Status": false,
    "Elemen": false
  })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  return (
    <div className="w-full space-y-4">
      {/* Search Bar Modern */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari Uraian..."
            value={(table.getColumn("Uraian")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Uraian")?.setFilterValue(event.target.value)
            }
            className="pl-10 h-10 border-slate-200 bg-white ring-offset-white focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 focus-visible:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {/* Slot untuk button aksi lain (Export/Filter Tambahan) */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
            Total: {data.length} Data
          </span>
        </div>
      </div>

      {/* Container Tabel dengan Shadow Lembut */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-slate-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-xs font-bold uppercase tracking-wider text-slate-600"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group hover:bg-blue-50/30 transition-colors border-slate-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3.5 text-sm text-slate-700 font-medium leading-relaxed">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-slate-400 italic">
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Modern */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-slate-500 font-medium">
          Halaman <span className="text-slate-900">{table.getState().pagination.pageIndex + 1}</span> dari <span className="text-slate-900">{table.getPageCount()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 px-4 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-xs"
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-9 px-4 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-xs"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  )
}
