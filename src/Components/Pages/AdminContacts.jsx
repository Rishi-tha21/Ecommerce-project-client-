import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import "./CSS/Admin.css";

const statusOptions = ["All", "Unread", "Read", "Replied"];

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(10);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        search: search.trim(),
        status: status !== "All" ? status : "",
      });
      const { data } = await API.get(`/contacts?${params.toString()}`);
      setContacts(data.contacts || []);
      setPages(data.pages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load contact messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, search, status]);

  const updateStatus = async (contactId, newStatus) => {
    try {
      await API.put(`/contacts/${contactId}/status`, { status: newStatus });
      toast.success(`Message marked ${newStatus.toLowerCase()}.`);
      fetchContacts();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update message status.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchContacts();
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <div>
          <h1>Contact Messages</h1>
          <p>Review customer inquiries and update their status.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSearchSubmit}>
        <div className="admin-form-row">
          <input
            type="text"
            placeholder="Search by name, email, phone, subject or message"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button type="submit" className="admin-submit-btn">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : contacts.length === 0 ? (
        <p className="admin-empty">No contact messages found.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.subject}</td>
                  <td>
                    {contact.message.length > 80
                      ? `${contact.message.slice(0, 80)}...`
                      : contact.message}
                  </td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td>{contact.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      disabled={contact.status === "Read"}
                      onClick={() => updateStatus(contact._id, "Read")}
                    >
                      Mark Read
                    </button>
                    <button
                      className="delete-btn"
                      disabled={contact.status === "Replied"}
                      onClick={() => updateStatus(contact._id, "Replied")}
                    >
                      Mark Replied
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-page-btn"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button
            className="admin-page-btn"
            disabled={page >= pages}
            onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
