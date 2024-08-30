import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function PostIndex() {
  const [posts, setPosts] = useState([]);

  // Fetch data posts
  const fetchDataPosts = async () => {
    try {
      const response = await api.get("/api/posts");
      setPosts(response.data.data.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  // Delete post with confirmation
  const deletePost = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/posts/${id}`);
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        );
        fetchDataPosts();
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was a problem deleting the post.',
          'error'
        );
      }
    }
  };

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
                  {posts && posts.length > 0 ? (
                    posts.map((post, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <img src={post.image} alt={post.title} width="200" className="rounded" />
                        </td>
                        <td className="align-middle">{post.title}</td>
                        <td className="align-middle">{post.content}</td>
                        <td className="text-center align-middle">
                          <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-info rounded-sm shadow border-0 mx-2">
                            EDIT
                          </Link>
                          <button className="btn btn-sm btn-danger rounded-sm shadow border-0 mx-2" onClick={() => deletePost(post.id)}>
                            HAPUS
                          </button>
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
  );
}
