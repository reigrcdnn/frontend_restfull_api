import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function PostCreate() {
  // Define state
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // State for image preview URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch post details based on ID
  const fetchDetailPost = async () => {
    try {
      const response = await api.get(`/api/posts/${id}`);
      const { title, content, image } = response.data.data;
      setTitle(title);
      setContent(content);
      setImagePreview(image); // Set the image preview URL
    } catch (error) {
      console.error("Error fetching post details", error);
    }
  };

  // Hook useEffect to fetch data on component mount
  useEffect(() => {
    fetchDetailPost();
  }, [id]);

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    // Create a URL for the new image file and set it to imagePreview
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Update post
  const updatePost = async (e) => {
    e.preventDefault();

    // Initialize form data
    const formData = new FormData();
    if (image) formData.append("image", image); // Append image only if it is selected
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    try {
      await api.post(`/api/posts/${id}`, formData);
      Swal.fire({
        title: 'Updated!',
        text: 'Post has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/posts");
      });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body ">
              <form onSubmit={updatePost}>
                <div className="my-3">
                  <h2>POST EDIT</h2>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Gambar
                    </label>
                    {imagePreview && (
                      <div className="mb-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                          className="img-thumbnail mb-2"
                        />
                      </div>
                    )}
                    <input
                      className="form-control"
                      type="file"
                      onChange={handleFileChange}
                      id="formFile"
                    />
                    {errors.image && <div className="alert alert-danger mt-2">{errors.image[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      placeholder="judul"
                      value={title}
                    />
                    {errors.title && <div className="alert alert-danger mt-2">{errors.title[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                      Content
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                    />
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
