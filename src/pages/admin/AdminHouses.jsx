import { useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/adminHouses.css";
// import { AuthContext } from "../../context/AuthContext";
// import { Navigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const Houses = () => {
  const [houses, setHouses] = useState([]);

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const res = await api.get("/houses");
      setHouses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   const handleSubmit = async () => {
//   try {
//     if (
//       !form.title ||
//       !form.city ||
//       !form.price ||
//       !form.description
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("title", form.title);
//     formData.append("city", form.city);
//     formData.append("price", form.price);
//     formData.append("description", form.description);

//     for (let i = 0; i < photos.length; i++) {
//       formData.append("photos", photos[i]);
//     }

//     await api.post("/houses", formData);

//     // const data = new FormData();

//     // data.append("title", form.title);
//     // data.append("city", form.city);
//     // data.append("price", Number(form.price));
//     // data.append("description", form.description);

//     // photos.forEach((photo) => {
//     //   data.append("photos", photo);
//     // });

//     if (editingId) {
//       await api.put(`/houses/${editingId}`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     } else {
//       await api.post("/houses", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     }

//     setForm({
//       title: "",
//       city: "",
//       price: "",
//       description: "",
//     });

//     setPhotos([]);
//     setEditingId(null);

//     fetchHouses();

//   } catch (err) {
//     console.log(err);
//   }
// };

const handleSubmit = async () => {
  try {

    if (
      !form.title ||
      !form.city ||
      !form.price ||
      !form.description
    ) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("city", form.city);
    formData.append("price", Number(form.price));
    formData.append("description", form.description);

    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    if (editingId) {

      await api.put(
        `/houses/${editingId}`,
        formData
      );

    } else {

      await api.post(
        "/houses",
        formData
      );

    }

    setForm({
      title: "",
      city: "",
      price: "",
      description: "",
    });

    setPhotos([]);
    setEditingId(null);

    fetchHouses();

  } catch (err) {

    console.log(err.response?.data || err);

  }
};
  const handleDelete = async (id) => {
    try {
      await api.delete(`/houses/${id}`);
      fetchHouses();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (house) => {
    setEditingId(house._id);

    setForm({
  title: house.title,
  city: house.city,
  price: house.price,
  description: house.description,
});
  };

//   if (!user?.isAdmin) {
//   return <Navigate to="/" />;
// }
  return (
    <AdminLayout>
    <div className="adminHouses">

      <h1>Manage Houses</h1>

      <div className="houseForm">

        <input
          name="title"
          placeholder="House title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="file"
          multiple
          onChange={(e) =>
            setPhotos(e.target.files)
          }
        />

        {/* <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setPhotos([...e.target.files])}
        /> */}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {editingId ? "Update House" : "Add House"}
        </button>

      </div>

      <div className="housesGrid">

        {houses.map((house) => (
          <div className="houseCard" key={house._id}>

            <img
              src={house.photos?.[0]}
              alt=""
            />

            <h3>{house.title}</h3>

            <p>{house.city}</p>

            <p>KES {house.price}</p>

            <div className="actions">

              <button
                className="editBtn"
                onClick={() => handleEdit(house)}
              >
                Edit
              </button>

              <button
                className="deleteBtn"
                onClick={() => handleDelete(house._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
    </AdminLayout>
  );
};

export default Houses;
