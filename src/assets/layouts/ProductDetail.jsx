import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/payments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: product.price,
            email,
            phone,
          }),
        }
      );

      const { token } = await response.json();

      // Redirect ke halaman pembayaran Midtrans
      window.snap.pay(token, {
        onSuccess: (result) => {
          alert("Payment successful!");
          console.log(result);
        },
        onPending: (result) => {
          alert("Payment pending.");
          console.log(result);
        },
        onError: (result) => {
          alert("Payment failed.");
          console.log(result);
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
    }
    setLoading(false);
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>Detail Product</li>
          </ul>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.name}
            />
          </figure>
          <div className="card-body">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p className="text-xl font-bold">
              Price: Rp {Number(product.price).toLocaleString()}
            </p>
            <div className="mt-4">
              {/* Formulir pembeli */}
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full mb-4"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* Tombol pembayaran */}
              <button
                onClick={handlePayment}
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
