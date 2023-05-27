import React from 'react';
 
const ErrorPage = () => {
    return (
        <div className="bg-red-900 min-h-screen flex items-center justify-center">
        <div className="bg-black rounded-lg shadow-lg p-8 m-4 max-w-sm w-full mx-auto">
          <h1 className="text-6xl text-center text-red-400 font-bold mb-6">404</h1>
          <p className="text-gray-300 text-center mb-8">Oops! The page you're looking for does not exist.</p>
          <div className="flex justify-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTqXRGKy_Ix0sxz-hhNCwS_Cv0FFZXpwKLK9s5wmDvA&usqp=CAU&ec=48665699" alt="Error Image" className="w-40 h-40 animate-pulse" />
          </div>
          <div className="mt-10 flex justify-center">
            <a href="/" className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 ease-in-out">Go back to Home</a>
          </div>
          <div className="mt-10 text-center text-gray-300 text-sm">
            <p className="mb-2">Or try one of these popular pages:</p>
            <span className="mx-2 text-gray-500">•</span>
            <a href="/videos" className="text-red-400 hover:underline">Videos</a>

          </div>
        </div>
      </div>
  
    )
}