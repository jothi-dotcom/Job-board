import React, { useRef } from 'react';

function Home() {
  const searchRef = useRef(null);

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div>
      
      
      <div className="relative h-screen w-full">
        <img
          src="https://i.pinimg.com/736x/59/6d/46/596d469c3ff9ed946a34ba56f3e5c670.jpg"
          alt="Job background"
          className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0  bg-opacity-50" />

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Job Board</h2>
          <p className="text-lg md:text-xl mb-6">Search for jobs or post your openings easily! </p>
          <button onClick={scrollToSearch}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition duration-300">Browse Jobs</button>
        </div>
      </div>

      <section ref={searchRef} className="py-16 bg-gray-100 text-center px-4">
        <h3 className="text-3xl font-bold mb-6">Search Jobs</h3>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search "
            className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </section>

      
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-center md:text-left">About Job Board</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Job Board is a modern platform built to connect job seekers with employers. Whether you are
              looking for your next opportunity or trying to hire the best talent, our tools make it easy to
              search, apply, post, and manage job listings efficiently. </p>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-vector/job-interview-concept_23-2148578985.jpg"
              alt="Job related illustration"
              className="rounded-lg shadow-lg w-full"/>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Job Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
