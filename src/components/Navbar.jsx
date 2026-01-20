import React from 'react';

const Navbar = () => {
  const goToHome = () => {
    const el = document.getElementById('classification');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // sync with tab
    if (window.__setPhysicsTab) {
      window.__setPhysicsTab('table');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* TITLE (CLICKABLE) */}
          <div
            onClick={goToHome}
            className="text-lg font-semibold text-gray-800 cursor-pointer
                       hover:text-indigo-600 transition-colors duration-200"
          >
            Physics Simulation Framework
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
