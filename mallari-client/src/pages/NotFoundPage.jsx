import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-700">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          The link you followed to get here must be broken...
        </p>

        {/* Optional: countdown hint */}
        <p className="mt-6 text-sm text-gray-400">
          Redirecting to homepage in a while...
        </p>
      </div>

      <Footer />
    </>
  )
}

export default NotFoundPage;