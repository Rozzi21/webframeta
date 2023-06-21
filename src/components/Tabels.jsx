import {
  Avatar,
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from "@material-tailwind/react";
import React from "react";
import face1 from "../images/avatar1.jpg";
import face2 from "../images/avatar2.jpg";
import face3 from "../images/avatar3.jpg";
import face4 from "../images/avatar4.jpg";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

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

const Tabels = () => {
  const randomIndex = getRandomImageIndex();

  const { loading, error, data } = useQuery(GET_UTANGS);

  const [deletePinjaman, { loading: deleteLoading,}] =
  useMutation(DELETE_PINJAMAN, {
    refetchQueries: [{ query: GET_UTANGS }],
  });




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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <Card className="w-1/4">
            <List>
              {data.tabel_utang.map((utang) => (
                <ListItem key={utang.id} className=" border border-solid border-gray-400 rounded-lg mb-4 p-6 flex justify-center">
                  <ListItemPrefix>
                    <Avatar className="w-40" variant="circular" alt="candice" src={images[randomIndex]} />
                  </ListItemPrefix>
                  <div className="w-96">
                    <Typography variant="h6" color="blue-gray">
                      {utang.nama}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Jumlah Pinjam: {utang.jumlah_pinjam}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Tanggal Pinjam: {utang.tanggal_pinjam}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
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
                  <Link to={`/edit/${utang.id}`} className="mt-6">
                    <Button fullWidth disabled={loading}>
                      {loading ? "Loading..." : "Edit"}
                    </Button>
                  </Link>
                  </div>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      </div>
  );
};

export default Tabels;
