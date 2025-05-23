import React, { useState, useEffect } from 'react'
import { createProfile, updateProfile, getProfiles } from '../services/api'

const Admin = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    coordinates: [],
    photo: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createProfile(form).then(() => {
      alert('Profile created!')
      setForm({ name: '', description: '', address: '', coordinates: [], photo: '' })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Photo URL" value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
      <input placeholder="Latitude" value={form.coordinates[1] || ''} onChange={e => {
        const val = parseFloat(e.target.value)
        setForm({ ...form, coordinates: [form.coordinates[0], val] })
      }} />
      <input placeholder="Longitude" value={form.coordinates[0] || ''} onChange={e => {
        const val = parseFloat(e.target.value)
        setForm({ ...form, coordinates: [val, form.coordinates[1]] })
      }} />
      <button type="submit">Add Profile</button>
    </form>
  )
}

export default Admin
