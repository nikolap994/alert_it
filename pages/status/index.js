import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Alert from '../../components/Alert';

function SearchMonitor() {

  const router = useRouter();

  const handleSubmit = async (event) => {

    event.preventDefault();

    const searchId = event.target.searchInput.value;

    if (isValidMongoId(searchId)) {
      router.push(`/status/${searchId}`);
    } else {
     
      alert("Please enter valid ID");
    }

  }

  function isValidMongoId(Id) {
    return Id.match(/^[0-9a-fA-F]{24}$/);
  }

  return (
    <div className="h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="flex h-10 space-x-2 mt-20">
        <input
          className="placeholder:italic placeholder:text-slate-500 text-base block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Monitor ID" type="text" name="searchInput"
          required
        />
        <input type="submit" value="Search" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" />
      </form>
    </div>
  )
}

export default SearchMonitor