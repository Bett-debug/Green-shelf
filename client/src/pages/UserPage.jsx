import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { users as usersApi, products as productsApi } from "../api";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    usersApi.get(id).then(setUser).catch(() => {});
    productsApi
      .list()
      .then((list) =>
        setUserProducts(list.filter((p) => p.user_id === Number(id)))
      )
      .catch(() => {});
  }, [id]);

  if (!user) return <div className="text-center py-12 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xl">
            {user.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-700">{user.username}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-3">Products by {user.username}</h3>
        {userProducts.length === 0 ? (
          <p className="text-gray-600 text-sm">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userProducts.map((p) => (
              <Link
                to={`/products/${p.id}`}
                key={p.id}
                className="block bg-white border border-gray-100 hover:shadow-md rounded-lg p-4"
              >
                <h4 className="text-emerald-700 font-semibold">{p.name}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
