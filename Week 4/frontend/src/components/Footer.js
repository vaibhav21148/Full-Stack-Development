import React from 'react';

function Footer() {
  return (
    <footer className="text-dark text-center py-3 mt-auto" style={{ backgroundColor: '#3febc9' }}>
      <div>© {new Date().getFullYear()} MyTube | All rights reserved</div>
    </footer>
  );
}

export default Footer;
