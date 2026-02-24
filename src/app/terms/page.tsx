export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 text-slate-700 leading-relaxed">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Syarat & Ketentuan</h1>
        <p className="mb-6 text-slate-500 font-medium italic">Terakhir diperbarui: 24 Februari 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Penerimaan Ketentuan</h2>
          <p>
            Dengan mengakses atau menggunakan <strong>KanbanApp</strong>, Anda setuju untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju, harap jangan gunakan aplikasi ini.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Batasan Tanggung Jawab</h2>
          <div className="bg-slate-50 border-l-4 border-blue-500 p-5 rounded-r-2xl">
            <p className="text-sm">
              <strong>Penting:</strong> KanbanApp disediakan "sebagaimana adanya". Kami tidak bertanggung jawab atas hilangnya data tugas yang diakibatkan oleh pembersihan cache browser, kerusakan perangkat, atau kegagalan sistem.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Penggunaan yang Diperbolehkan</h2>
          <p>
            Anda dilarang menggunakan aplikasi ini untuk tujuan ilegal atau melanggar hukum. Anda sepenuhnya bertanggung jawab atas konten yang Anda tulis dalam papan tugas.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Perubahan Layanan</h2>
          <p>
            Kami berhak menambah, mengubah, atau menghentikan fitur apapun dalam aplikasi ini kapan pun tanpa pemberitahuan terlebih dahulu.
          </p>
        </section>
      </div>
    </div>
  );
}