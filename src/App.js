import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePages from "./pages/HomePages";
import DaftarPinjam from "./pages/DaftarPinjamPages";
import { ApolloProvider } from "@apollo/client";
import { Api } from "./api/Graph";
import TambahPinjamPages from "./pages/TambahPinjamPages";
import NotFound from "./pages/NotFound";
import TotalPinjamana from "./pages/TotalPinjamana";

function App() {
  return (
    <ApolloProvider client={Api} >
      <Router>
        <Routes>
          <Route path="/" element={<HomePages />}></Route>
          <Route path="/daftarpeminjam" element={<DaftarPinjam />}></Route>
          <Route path="/tambah" element={<TambahPinjamPages />}></Route>
          <Route path="/total" element={<TotalPinjamana />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
