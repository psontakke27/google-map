import React from "react";

const ProfileCard = ({ profile, onSummary, onEdit, onDelete }) => (
  <div style={cardStyle}>
    <img src={profile.photo} alt={profile.name} style={{ width: "100px" }} />
    <h3>{profile.name}</h3>
    <p>{profile.description}</p>
    <p><strong>Address:</strong> {profile.address}</p>
    <button onClick={() => onSummary(profile)}>Summary</button>
    <button onClick={() => onEdit(profile)}>Edit</button>
    <button onClick={() => onDelete(profile.id)}>Delete</button>
  </div>
);

const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  margin: "1rem",
  borderRadius: "8px",
  width: "250px"
};

export default ProfileCard;

