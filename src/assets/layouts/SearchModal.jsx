import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import React Router

export default function SearchModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const timeout = setTimeout(() => {
        fetchResults(searchTerm);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/products/search?query=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <dialog id="my_modal_2" className="modal backdrop-blur-sm mx-auto">
        <div className="modal-box">
          <form method="dialog" className="modal-backdrop gap-7">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered text-black w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="mt-4">
              {loading && <p className="text-white">Loading...</p>}
              {!loading && searchTerm && results.length === 0 && (
                <p className="text-white">No results found</p>
              )}
              {!loading && results.length > 0 && (
                <ul className="space-y-4">
                  {results.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 bg-white text-black rounded-md shadow"
                    >
                      <Link
                        to={`/product/${item.id}`}
                        className="flex items-center"
                      >
                        <img
                          src={`http://127.0.0.1:8000/storage/${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            Rp {Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
