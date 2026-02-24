import React, { useState } from 'react';

const Search = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setSearchTerm(inputValue);
    } catch (error) {
      console.error(error);
    } finally {
      setInputValue('');
    }
  }

  return (
    <form className="max-w-xl mx-auto px-4" onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative group">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <svg className="w-5 h-5 text-white/70 group-focus-within:text-white transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-12 text-md text-white border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none placeholder-white/60 shadow-lg transition-all duration-300"
          placeholder="Search Cities (e.g., London, Tokyo)"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value) }}
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm focus:ring-4 focus:outline-none focus:ring-white/20 font-medium rounded-xl text-sm px-5 py-2 transition-all duration-300 border border-white/10"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default Search