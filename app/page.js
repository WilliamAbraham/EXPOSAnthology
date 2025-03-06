"use client";

import React, { useEffect, useState } from "react";
import WorkList from "../components/Worklist";

const Home = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch("/api/works"); // Make sure this API route exists
        const data = await res.json();
        setWorks(data);
      } catch (error) {
        console.error("Failed to fetch works:", error);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div>
      <h1>Welcome to My Work Showcase</h1>
      <WorkList works={works} />
    </div>
  );
};

export default Home;
