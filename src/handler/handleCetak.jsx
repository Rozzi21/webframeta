import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Data peminjaman uang dari JSON
const peminjamanUangData = [
  { nama: 'John Doe', jumlah: 500000, tanggalPinjam: '2023-06-01', tanggalKembali: '2023-06-08' },
  { nama: 'Jane Smith', jumlah: 750000, tanggalPinjam: '2023-06-02', tanggalKembali: '2023-06-09' },
  // ...
];

// Membuat definisi kolom untuk tabel
const tableColumns = [
  { text: 'Nama', dataKey: 'nama' },
  { text: 'Jumlah', dataKey: 'jumlah' },
  { text: 'Tanggal Pinjam', dataKey: 'tanggalPinjam' },
  { text: 'Tanggal Kembali', dataKey: 'tanggalKembali' },
];

// Mengonversi data peminjaman uang ke dalam bentuk array 2D
const tableData = peminjamanUangData.map(peminjaman => ({
  nama: peminjaman.nama,
  jumlah: peminjaman.jumlah,
  tanggalPinjam: peminjaman.tanggalPinjam,
  tanggalKembali: peminjaman.tanggalKembali,
}));

// Membuat dokumen PDF
const documentDefinition = {
  content: [
    { text: 'Data Peminjaman Uang Pinjam Bang', style: 'header' },
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [tableColumns.map(column => column.text), ...tableData.map(row => Object.values(row))],
      },
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      marginBottom: 10,
    },
  },
};

const handlerCetak = () => {
    generatePDF();
  };

// Fungsi untuk menghasilkan PDF dari dokumen definisi
const generatePDF = () => {
  pdfMake.createPdf(documentDefinition).download('data_peminjaman_uang.pdf');
};


export default handlerCetak;