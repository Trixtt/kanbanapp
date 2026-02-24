export default function PrivacyPage() {
  return (
    // Menambahkan bg-white dan min-h-screen agar seluruh layar tetap putih
    <div className="min-h-screen bg-white"> 
      <div className="max-w-3xl mx-auto px-6 py-20 text-slate-700 leading-relaxed">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Kebijakan Privasi</h1>
        <p className="mb-6 text-slate-500 font-medium italic">Terakhir diperbarui: 24 Februari 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Penyimpanan Data Lokal</h2>
          <p>
            <strong>KanbanApp</strong> menghargai privasi Anda sepenuhnya. Seluruh data tugas yang Anda buat disimpan langsung di perangkat Anda menggunakan teknologi <strong>Local Storage</strong>. Kami tidak mengirimkan data tersebut ke server manapun tanpa seizin Anda.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Penggunaan Data</h2>
          <p>Data Anda hanya digunakan untuk fungsionalitas aplikasi, antara lain:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Menampilkan daftar tugas Anda.</li>
            <li>Mengatur status pekerjaan (To Do, Doing, Done).</li>
            <li>Menyimpan preferensi tampilan antarmuka.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Keamanan</h2>
          <p>
            Karena data disimpan di browser Anda, keamanan data bergantung pada keamanan perangkat yang Anda gunakan. Kami menyarankan untuk tidak memasukkan informasi sensitif ke dalam kartu tugas.
          </p>
        </section>
      </div>
    </div>
  );
}