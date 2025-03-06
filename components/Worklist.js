import React, { useState, useEffect } from "react";

const WorkList = ({ works }) => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Ensure works is not undefined and categories are correctly generated
  const categories = ["All", ...new Set(works ? works.map(work => work.category) : [])];

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const filteredWorks = works
    ? works
        .filter((work) => {
          // Filter works by category
          const isInSelectedCategories = selectedCategories.includes("All") || selectedCategories.includes(work.category);
          // Filter works by search keyword (matches title or category)
          const matchesSearch = work.Title.toLowerCase().includes(searchKeyword.toLowerCase()) || work.category.toLowerCase().includes(searchKeyword.toLowerCase());
          return isInSelectedCategories && matchesSearch;
        })
    : [];

  return (
    <div>
      <h2>Work List</h2>
      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {/* Category Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            style={{
              backgroundColor: selectedCategories.includes(cat) ? "#007bff" : "#e0e0e0",
              color: selectedCategories.includes(cat) ? "white" : "black",
              border: "none",
              padding: "10px 20px",
              margin: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Display Filtered Works */}
      <ul>
        {filteredWorks.map((work) => (
          <li key={work.Title}>
            <h3>{work.Title}</h3>
            <p>By: {work.Name}</p>
            {/* Embed the Google Drive PDF preview */}
            <iframe
              src={work.pdf}
              width="600"
              height="400"
              frameBorder="0"
              allowFullScreen
              title={work.Title}
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkList;
