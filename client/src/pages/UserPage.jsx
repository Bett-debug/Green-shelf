import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { users as usersApi, products as productsApi } from "../api";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (!id) return;
    usersApi.get(id).then(setUser).catch(() => {});
    productsApi.list().then(list => setUserProducts(list.filter(p => p.user_id === Number(id)))).catch(() => {});
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold">{user.username}</h1>
      <div className="text-sm text-gray-600">{user.email}</div>

      <h2 className="mt-6 text-xl">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {userProducts.map(p => (
          <div key={p.id} className="card">
            <h3 className="font-semibold">{p.name}</h3>
            <div className="text-sm">{p.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
