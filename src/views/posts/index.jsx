import {useState, useEffect} from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);


  const fetchDataPosts = async () => {
    await api.get("/api/posts").then((response) => {
      console.log(response.data.data.data);
      setPosts(response.data.data.data);
    });
  };

 useEffect(() => {
  fetchDataPosts();
 }, []);

 return (
  <div className="container mt-5 mb-5">
    <div className="row">
      <div className="col-md-12">
        <Link to="/posts/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">
        Tambah POST Baru
        </Link>
        <div className="card border-0 rounded shadow">
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="bg-dark text-center">
                <tr>
                  <th scope="col">Gambar</th>
                  <th scope="col">Tittle</th>
                  <th scope="col">Konten</th>
                  <th scope="col" style={{ width: "15%" }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts && posts.length > 0 ? (posts.map((post, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <img src="{post.image}" alt={post.title} width="200" className="rounded" />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td className="text-center">
                      <Link to={`/posts/edit.${post.id}`} className="btn btn-sm btn-info rounded-sm shadow border-0 me-2">EDIT</Link>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-danger rounded-sm shadow border-0 me-2">HAPUS</button>
                    </td>
                  </tr>
               ))
              ) : (
                <tr>
                  <td className="text-center" colSpan="4">
                    <div className="alert alert-danger mb-0">
                      Tidak ada data POST
                    </div>  
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
 )

}