import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { FiCheck, FiAlertCircle } from "react-icons/fi";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // idle | saving | saved | error
  const [saveState, setSaveState] = useState("idle");
  const [saveError, setSaveError] = useState("");
  const resetTimer = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",

    height: "",
    weight: "",
    age: "",
    bodyType: "",
    footSize: "",

    addresses: "",
  });

  const getProfile = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const response = await api.get("/auth/profile");

      const user = response.data.user;

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",

        height: user.height || "",
        weight: user.weight || "",
        age: user.age || "",
        bodyType: user.bodyType || "",
        footSize: user.footSize || "",

        addresses: user.addresses || "",
      });
    } catch (err) {
      console.log(err);
      setLoadError("Unable to load profile. Refresh the page to try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
    return () => clearTimeout(resetTimer.current);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Editing after a save/error clears the confirmation so the button
    // reflects the current unsaved state again.
    if (saveState !== "saving") {
      setSaveState("idle");
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    clearTimeout(resetTimer.current);

    try {
      setSaveState("saving");
      setSaveError("");

      const response = await api.patch("/auth/update", form);

      dispatch(updateUser(response.data.user));

      setSaveState("saved");
      resetTimer.current = setTimeout(() => setSaveState("idle"), 2200);
    } catch (err) {
      console.log(err);

      setSaveError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
      setSaveState("error");
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading Profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        {loadError && (
          <div className="profile-banner is-error">
            <FiAlertCircle size={16} />
            <span>{loadError}</span>
          </div>
        )}

        <form onSubmit={saveProfile}>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Name</label>

              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="profile-field">
              <label>Email</label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Phone</label>

              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div className="profile-field">
              <label>Gender</label>

              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Height (cm)</label>

              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Weight (kg)</label>

              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Age</label>

              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Body Type</label>

              <select
                name="bodyType"
                value={form.bodyType}
                onChange={handleChange}
              >
                <option value="">Select</option>

                <option>Slim</option>

                <option>Regular</option>

                <option>Athletic</option>

                <option>Heavy</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Foot Size</label>

              <input
                type="number"
                name="footSize"
                value={form.footSize}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile-field mt-4">
            <label>Address</label>

            <textarea
              rows="4"
              name="addresses"
              value={form.addresses}
              onChange={handleChange}
            />
          </div>

          {saveState === "error" && (
            <div className="profile-banner is-error mt-4">
              <FiAlertCircle size={16} />
              <span>{saveError}</span>
            </div>
          )}

          <button
            className={`profile-btn ${saveState === "saved" ? "is-saved" : ""}`}
            disabled={saveState === "saving"}
          >
            {saveState === "saving" && (
              <span className="profile-btn-loading">
                <span className="profile-btn-dot" />
                <span className="profile-btn-dot" />
                <span className="profile-btn-dot" />
              </span>
            )}
            {saveState === "saved" && (
              <span className="profile-btn-content">
                <FiCheck size={18} />
                Saved
              </span>
            )}
            {(saveState === "idle" || saveState === "error") && "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;