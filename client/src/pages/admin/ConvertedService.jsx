import React from 'react'

const ConvertedService = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Converted Service</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Service Name</label>
          <input type="text" className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Client Name</label>
          <input type="text" className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Conversion Date</label>
          <input type="date" className="border border-gray-300 p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Converted Service</button>
      </form>
    </div>
  )
}

export default ConvertedService
