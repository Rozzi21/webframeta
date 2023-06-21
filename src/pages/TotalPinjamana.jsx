import { gql, useQuery } from "@apollo/client";
import React from "react";
import Navbar from "../components/Navbar";

const GET_UTANGS = gql`
  query GetUtangs {
    tabel_utang {
      jumlah_pinjam
    }
  }
`;

const TotalPinjamana = () => {
  const { loading, error, data } = useQuery(GET_UTANGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalHarga = data.tabel_utang.reduce((total, utang) => {
    return total + utang.jumlah_pinjam;
  }, 0);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          Total Harga Semua
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-md">
          <h2 className="text-3xl font-semibold text-center">
            Rp. {totalHarga}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotalPinjamana;
