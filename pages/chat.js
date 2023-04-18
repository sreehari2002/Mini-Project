import { useState } from "react";
import axios from "axios";
import Image from "next/image"; // Import the Image component from Next.js
// import Logo from "../public/your-logo.svg"; // Replace with your company logo

function HomeScreen() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };
    try {
      const response = await axios.post("/api/submit-name", data); // Replace with your backend API endpoint
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="h-16 w-16 mb-8">
        {/* <Image src={Logo} alt="Your company logo" /> */}
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to our website!
      </h1>
      <p className="text-gray-600 mb-8">
        Please enter your name below so we can personalize your experience.
      </p>
      <form onSubmit={handleSubmit} className="flex items-center">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="bg-white border border-gray-300 rounded-lg py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-lg py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default HomeScreen;
