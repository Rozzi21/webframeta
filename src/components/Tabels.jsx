import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  Input,
  Avatar,
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import face1 from "../images/avatar1.jpg";
import face2 from "../images/avatar2.jpg";
import face3 from "../images/avatar3.jpg";
import face4 from "../images/avatar4.jpg";
const images = [face1, face2, face3, face4];

function getRandomImageIndex() {
  return Math.floor(Math.random() * images.length);
}

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

const DELETE_PINJAMAN = gql`
  mutation DeletePinjaman($id: Int!) {
    delete_tabel_utang(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const UPDATE_PINJAMAN = gql`
  mutation UpdatePinjaman(
    $id: Int!
    $nama: String
    $jumlahPinjam: Int
    $tanggalPinjam: date
    $tanggalKembali: date
  ) {
    update_tabel_utang(
      where: { id: { _eq: $id } }
      _set: {
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

const Tabels = () => {
  const randomIndex = getRandomImageIndex();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    nama: "",
    jumlahPinjam: "",
    tanggalPinjam: "",
    tanggalKembali: "",
  });

  const { loading, error, data } = useQuery(GET_UTANGS);

  const [deletePinjaman, { loading: deleteLoading }] = useMutation(
    DELETE_PINJAMAN,
    {
      refetchQueries: [{ query: GET_UTANGS }],
    }
  );

  const [updatePinjaman, { loading: updateLoading }] = useMutation(
    UPDATE_PINJAMAN,
    {
      refetchQueries: [{ query: GET_UTANGS }],
    }
  );

  const handleEdit = (utang) => {
    setEditFormData({
      id: utang.id,
      nama: utang.nama,
      jumlahPinjam: utang.jumlah_pinjam,
      tanggalPinjam: utang.tanggal_pinjam,
      tanggalKembali: utang.tanggal_kembali,
    });
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    deletePinjaman({
      variables: {
        id: id,
      },
    })
      .then((result) => {
        // Handle success
        console.log(result);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePinjaman({
      variables: {
        id: editFormData.id,
        nama: editFormData.nama,
        jumlahPinjam: parseInt(editFormData.jumlahPinjam),
        tanggalPinjam: editFormData.tanggalPinjam,
        tanggalKembali: editFormData.tanggalKembali,
      },
    })
      .then((result) => {
        // Handle success
        console.log(result);
        setEditFormData({
          id: null,
          nama: "",
          jumlahPinjam: "",
          tanggalPinjam: "",
          tanggalKembali: "",
        });
        setShowEditForm(false);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex justify-center">
    {!showEditForm && (
      <div className="w-full flex justify-center">
        <Card className="w-1/4">
          <List>
            {data.tabel_utang.map((utang) => (
              <ListItem
                key={utang.id}
                className=" border border-solid border-gray-400 rounded-lg mb-4 p-6 flex justify-center mt-4"
              >
                <ListItemPrefix>
                  <Avatar
                    className="w-40"
                    variant="circular"
                    alt="candice"
                    src={images[randomIndex]}
                  />
                </ListItemPrefix>
                <div className="w-96">
                  <Typography variant="h6" color="blue-gray">
                    {utang.nama}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Jumlah Pinjam: {utang.jumlah_pinjam}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Tanggal Pinjam: {utang.tanggal_pinjam}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Tanggal Kembali: {utang.tanggal_kembali}
                  </Typography>
                </div>
                <div className="w-24 ml-4 mb-6">
                  <Button
                    className="mt-6"
                    fullWidth
                    onClick={() => handleDelete(utang.id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Deleting..." : "Hapus"}
                  </Button>
                  <Button
                    fullWidth
                    disabled={loading}
                    className="mt-4"
                    onClick={() => handleEdit(utang)}
                  >
                    {loading ? "Loading..." : "Edit"}
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    )}

    {showEditForm && (
      <div className="popup-form">
        <div className="flex justify-center mt-40 ">
          <Card color="transparent" shadow={false}>
            <Typography variant="h3" color="blue-gray">
              Edit Pinjaman
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Harap memasukkan data dengan benar
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleUpdate}
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Name"
                  value={editFormData.nama}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      nama: e.target.value,
                    })
                  }
                />
                <Input
                  size="lg"
                  label="Jumlah Pinjam"
                  value={editFormData.jumlahPinjam}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jumlahPinjam: e.target.value,
                    })
                  }
                />
                <Input
                  type="date"
                  size="lg"
                  label="Tanggal Pinjam"
                  value={editFormData.tanggalPinjam}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tanggalPinjam: e.target.value,
                    })
                  }
                />
                <Input
                  type="date"
                  size="lg"
                  label="Tanggal Kembali"
                  value={editFormData.tanggalKembali}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tanggalKembali: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                className="mt-6"
                fullWidth
                type="submit"
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update"}
              </Button>
              {error && (
                <Typography variant="small" color="red" className="mt-2">
                  Error: {error.message}
                </Typography>
              )}
            </form>
          </Card>
        </div>
      </div>
    )}
  </div>
  );
};

export default Tabels;
