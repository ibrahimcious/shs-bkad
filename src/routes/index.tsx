import { getData } from '#/modules/tables/tables.api'
import { columns } from '#/modules/tables/tables.columns'
import { DataTable } from '#/modules/tables/tables.data-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getData(),
  head: () => ({
    meta: [
      { title: "List SHS | BKAD Pasuruan" },
      { name: "description", content: "Daftar Standar Harga Satuan Pemerintah Kabupaten Pasuruan" },
      { property: "og:title", content: "List SHS BKAD Pasuruan" },
      { property: "og:description", content: "Aplikasi internal Sekretariat BKAD untuk monitoring Standar Harga Satuan." },
      { property: "og:image", content: "/logo512.png" },
    ],
  }),
})

function Home() {
  const data = Route.useLoaderData()
  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header Section Modern */}
        <header className="mb-10 flex items-center justify-between border-b border-slate-200 pb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20 blur-sm" />
              <div className="relative rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
                <img src="/bkad.png" alt="Logo BKAD" className="h-14 w-14 object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900">
                List <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">SHS</span>
              </h1>
              <p className="text-slate-500 font-semibold text-sm uppercase tracking-widest mt-1">
                SHS yang statusnya diterima
              </p>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Tahun Anggaran</p>
            <p className="text-xl font-black text-slate-800">2026</p>
          </div>
        </header>

        {/* Content Section */}
        <main className="relative">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

          <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-2">
            <DataTable columns={columns} data={data} />
          </div>
        </main>

      </div>
    </div>
  )
}
