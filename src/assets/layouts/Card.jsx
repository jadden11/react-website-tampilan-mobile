import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CardList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold text-center pb-8 underline text-pink-700">
        Recommended Products
      </h2>
      <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory px-6 scroll-smooth">
        {data.map((item) => (
          <div
            key={item.id}
            className="min-w-[300px] snap-center card bg-white shadow-lg rounded-xl p-4"
          >
            {/* Gambar Produk */}
            <figure className="relative">
              <img
                src={`http://127.0.0.1:8000/storage/${item.image}`}
                alt={item.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              {/* Harga di atas gambar */}
              <div className="absolute top-2 right-2 bg-pink-600 text-white text-sm px-3 py-1 rounded-full shadow">
                Rp {Number(item.price).toLocaleString()}
              </div>
            </figure>

            {/* Konten Card */}
            <div className="mt-4">
              {/* Nama Produk */}
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {item.name}
              </h3>

              {/* Badge Kategori */}
              <div className="badge badge-primary mt-2">
                {item.category.name}
              </div>
            </div>

            {/* Tombol */}
            <div className="mt-4">
              <Link to={`/product/${item.id}`}>
                <button className="bg-pink-600 text-white text-sm font-medium py-2 px-4 rounded-lg w-full hover:bg-pink-700 transition">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
