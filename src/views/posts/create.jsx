import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function PostCreate() {
  //mendefinisikan state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  ///validasi data
  const [errors, setErrors] = useState("");
  const navigate = useNavigate([]);

  //membuat method pengaturan perubahan file
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  //method kirim data store post
  const storePost = async (e) => {
    e.preventDefault();

    //inisialisasi form data
    const formData = new FormData();

    //menyimpan data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    //set API for send data
    await api
      .post("/api/posts", formData)
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body ">
              <form onSubmit={storePost}>
                <div className="my-3">
                  <h2>TAMBAH POST BARU</h2>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Gambar
                    </label>
                    <input className="form-control" type="file" onChange={handleFileChange} id="formFile" />
                    {errors.image && <div className="alert alert-danger mt-2">{errors.image[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Tittle
                    </label>
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} id="title" placeholder="judul" />
                    {errors.title && <div className="alert alert-danger mt-2">{errors.title[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                      Content
                    </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setContent(e.target.value)} />
                    {errors.content && <div className="alert alert-danger mt-2">{errors.content[0]}</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg mx-1">
                  Simpan
                </button>
                <button type="reset" className="btn btn-secondary btn-lg mx-1">
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

