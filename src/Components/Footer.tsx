import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#eee" }}>
      <p>&copy; {new Date().getFullYear()} TaeMin FC. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
