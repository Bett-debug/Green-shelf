
import React, { useEffect, useState } from "react";
import { tags as tagsApi } from "../api";
import { Link } from "react-router-dom";

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    tagsApi
      .list()
      .then((list) => setTags(list || []))
      .catch(() => setTags([]));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Tags</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tags.length === 0 ? (
          <div className="text-gray-500">No tags found.</div>
        ) : (
          tags.map((t) => (
            <Link key={t.id} to={`/products?tag=${t.id}`} className="block p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm">
              <div className="text-sm font-medium text-gray-800">{t.name}</div>
              <div className="text-xs text-gray-500 mt-1">View products</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
