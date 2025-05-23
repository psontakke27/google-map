import React, { useEffect, useState } from 'react'
import { getProfiles, deleteProfile } from '../services/api'
import ProfileCard from '../components/ProfileCard'
import MapComponent from '../components/MapComponent'
import Loader from '../components/Loader'

const Home = () => {
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    getProfiles()
      .then(res => setProfiles(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = (id) => {
    deleteProfile(id)
      .then(() => setProfiles(prev => prev.filter(p => p.id !== id)))
  }

  const filtered = profiles.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return loading ? (
    <Loader />
  ) : (
    <div>
      <input
        type="text"
        placeholder="Search profiles"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="profile-grid">
        {filtered.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onShowMap={() => setSelectedProfile(profile)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {selectedProfile && (
        <MapComponent coords={{ lat: selectedProfile.coordinates[1], lng: selectedProfile.coordinates[0] }} />
      )}
    </div>
  )
}

export default Home
