import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function ErrorPage() {
  const containerRef = useRef(null);


  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9, y: -20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 md:p-8"
    >
      <div className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-300 ease-in-out">
        {/* Error Icon (simple SVG) */}
        <svg
          className="w-20 h-20 mx-auto mb-6 text-red-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>

        <h1 className="text-5xl md:text-6xl font-extrabold text-red-400 mb-4 tracking-tight">
          Oops!
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          Something went wrong.
        </p>
        <p className="text-md md:text-lg text-gray-400 mb-8">
          I apologize for the inconvenience. 
        </p>

        <a
          href="/" 
          className="inline-block px-6 py-1 rounded-full bg-green-800 text-white font-bold text-lg 
                     hover:bg-green-900 transition-colors duration-300 ease-in-out 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;