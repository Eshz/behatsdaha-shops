import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    if (!search) {
      setResult("Please enter a value.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("search", search);

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycby2T9oUyeCqi65gJqauQvjdmAsxjwOkF4MQdF7ugDez_ZoPTsJFK16qzBxrsY3YU8Q/exec", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      setResult("Result: " + text);
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔍 Google Sheet Finder</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter value"
        style={{ padding: "0.5rem", marginRight: "0.5rem", width: "250px" }}
      />
      <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
        Search
      </button>
      <p style={{ marginTop: "1rem" }}>{result}</p>
    </div>
  );
}