import React, { useContext, useState, useMemo } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products } = useContext(ProductContext);

  const categories = ["All", "Recycled", "Organic", "Reusable", "Energy Saving", "Eco Friendly"];

  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((p) => (p.category || "").toLowerCase() === category.toLowerCase());
    }

    if (sort === "price-asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") data.sort((a, b) => b.price - a.price);
    if (sort === "eco-asc") data.sort((a, b) => (a.sustainability_score || 0) - (b.sustainability_score || 0));
    if (sort === "eco-desc") data.sort((a, b) => (b.sustainability_score || 0) - (a.sustainability_score || 0));

    return data;
  }, [products, search, category, sort]);

  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Explore Eco-Friendly Products
      </h2>

      
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-200 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-lg outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg outline-none"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="eco-asc">Eco Score Low → High</option>
          <option value="eco-desc">Eco Score High → Low</option>
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Reset
        </button>
      </div>

      
      {paginatedProducts.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "text-gray-400" : "text-emerald-600 hover:underline"
            }`}
          >
            &laquo; Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "text-gray-400"
                : "text-emerald-600 hover:underline"
            }`}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
