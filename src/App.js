import React, { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import ProfileForm from "./components/ProfileForm";
import MapComponent from "./components/MapComponent";

const API = "http://localhost:5000/api/profiles";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProfiles(data);
  };

  const handleSave = async (profile) => {
    if (profile.id) {
      await fetch(`${API}/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
    }
    fetchProfiles();
    setEditingProfile(null);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchProfiles();
  };

  const handleSummary = async (profile) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(profile.address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await res.json();
    if (data.results[0]) {
      const loc = data.results[0].geometry.location;
      setSelectedLocation(loc);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile Manager</h1>

      <ProfileForm
        onSave={handleSave}
        profileToEdit={editingProfile}
        onCancel={() => setEditingProfile(null)}
      />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {profiles.map((p) => (
          <ProfileCard
            key={p.id}
            profile={p}
            onSummary={handleSummary}
            onEdit={setEditingProfile}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {selectedLocation && (
        <>
          <h2>Map View</h2>
          <MapComponent lat={selectedLocation.lat} lng={selectedLocation.lng} />
        </>
      )}
    </div>
  );
};

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Admin from './pages/Admin'
// import ProfileDetail from './pages/ProfileDetail'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/profile/:id" element={<ProfileDetail />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App
