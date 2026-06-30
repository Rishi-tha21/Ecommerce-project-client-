import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import "./CSS/Admin.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", oldPrice: "", category: "women",
    brand: "SHOPPER", stock: "100", sizes: "S,M,L,XL", colors: "",
    isFeatured: false, isNewCollection: false,
  });

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products?limit=100");
      setProducts(data.products || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...form, price: Number(form.price), oldPrice: Number(form.oldPrice), stock: Number(form.stock),
      sizes: form.sizes.split(",").map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/products/${editId}`, productData);
        toast.success("Product updated!");
      } else {
        await API.post("/products", productData);
        toast.success("Product added!");
      }
      setShowForm(false);
      setEditId(null);
      setForm({ name: "", description: "", price: "", oldPrice: "", category: "women", brand: "SHOPPER", stock: "100", sizes: "S,M,L,XL", colors: "", isFeatured: false, isNewCollection: false });
      fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name, description: product.description, price: product.price,
      oldPrice: product.oldPrice || "", category: product.category, brand: product.brand || "",
      stock: product.stock, sizes: (product.sizes || []).join(", "), colors: (product.colors || []).join(", "),
      isFeatured: product.isFeatured || false, isNewCollection: product.isNewCollection || false,
    });
    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) { toast.error("Failed to delete"); }
  };

  if (loading) return <div className="admin"><div className="loading-spinner"></div></div>;

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Manage Products</h1>
        <button className="admin-add-btn" onClick={() => { setShowForm(!showForm); setEditId(null); }}>
          {showForm ? "✕ Cancel" : "+ Add Product"}
        </button>
      </div>
      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <div className="admin-form-row">
            <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
            <input name="oldPrice" type="number" placeholder="Old Price" value={form.oldPrice} onChange={handleChange} />
            <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
          </div>
          <div className="admin-form-row">
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="women">Women</option><option value="men">Men</option><option value="kid">Kids</option>
            </select>
            <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
          </div>
          <div className="admin-form-row">
            <input name="sizes" placeholder="Sizes (comma separated)" value={form.sizes} onChange={handleChange} />
            <input name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} />
          </div>
          <div className="admin-form-checks">
            <label><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} /> Featured</label>
            <label><input type="checkbox" name="isNewCollection" checked={form.isNewCollection} onChange={handleChange} /> New Collection</label>
          </div>
          <button type="submit" className="admin-submit-btn">{editId ? "Update Product" : "Add Product"}</button>
        </form>
      )}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td><span className="category-badge">{p.category}</span></td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(p._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
