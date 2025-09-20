import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🏠 Property Management System</h1>
          <p>Demo Client for AREP Backend - Spring JPA MySQL</p>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2025 Property Management Demo - Universidad ECI</p>
      </footer>
    </div>
  );
};

export default Layout;