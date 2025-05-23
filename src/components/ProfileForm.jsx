import React, { useState, useEffect } from "react";

const ProfileForm = ({ onSave, profileToEdit, onCancel }) => {
  const [profile, setProfile] = useState({ name: "", photo: "", description: "", address: "" });

  useEffect(() => {
    if (profileToEdit) setProfile(profileToEdit);
  }, [profileToEdit]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
    setProfile({ name: "", photo: "", description: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
      <input name="photo" value={profile.photo} onChange={handleChange} placeholder="Photo URL" required />
      <input name="description" value={profile.description} onChange={handleChange} placeholder="Description" required />
      <input name="address" value={profile.address} onChange={handleChange} placeholder="Address" required />
      <button type="submit">{profileToEdit ? "Update" : "Add"} Profile</button>
      {profileToEdit && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default ProfileForm;
