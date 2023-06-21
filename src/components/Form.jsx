import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";


const GET_UTANGS = gql`
  query GetUtangs {
    tabel_utang {
      id
      nama
      jumlah_pinjam
      tanggal_pinjam
      tanggal_kembali
    }
  }
`;

const ADD_PINJAMAN = gql`
  mutation AddPinjaman(
    $nama: String!
    $jumlahPinjam: Int!
    $tanggalPinjam: date!
    $tanggalKembali: date!
  ) {
    insert_tabel_utang(
      objects: {
        nama: $nama
        jumlah_pinjam: $jumlahPinjam
        tanggal_pinjam: $tanggalPinjam
        tanggal_kembali: $tanggalKembali
      }
    ) {
      affected_rows
    }
  }
`;

const Form = () => {
  const [nama, setNama] = useState("");
  const [jumlahPinjam, setJumlahPinjam] = useState("");

  
  const [tanggalPinjam, setTanggalPinjam] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tanggalKembali, setTanggalKembali] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [addPinjaman, { loading, error }] = useMutation(ADD_PINJAMAN,
     {  refetchQueries: [{ query: GET_UTANGS }],}
  
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();

    addPinjaman({
      variables: {
        nama: nama,
        jumlahPinjam: parseInt(jumlahPinjam),
        tanggalPinjam: tanggalPinjam,
        tanggalKembali: tanggalKembali,
      },
    })
      .then((result) => {
        // Handle success
        console.log(result);
        // Reset form
        setNama("");
        setJumlahPinjam("");
        setTanggalPinjam(new Date().toISOString().split("T")[0]);
        setTanggalKembali(new Date().toISOString().split("T")[0]);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center mt-40">
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="blue-gray">
          Tambah Pinjaman
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Harap memasukkan data dengan benar
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <Input
              size="lg"
              label="Jumlah Pinjam"
              value={jumlahPinjam}
              onChange={(e) => setJumlahPinjam(e.target.value)}
            />
            <Input
              type="date"
              size="lg"
              label="Tanggal Pinjam"
              value={tanggalPinjam}
              onChange={(e) => setTanggalPinjam(e.target.value)}
            />
            <Input
              type="date"
              size="lg"
              label="Tanggal Kembali"
              value={tanggalKembali}
              onChange={(e) => setTanggalKembali(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? "Loading..." : "Gas Pinjol"}
          </Button>
          {error && (
            <Typography variant="small" color="red" className="mt-2">
              Error: {error.message}
            </Typography>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Form;
