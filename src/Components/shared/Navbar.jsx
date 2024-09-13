import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Home
        </Link>
        <div className="space-x-4">
          <Link to="/list-fonts" className="hover:text-gray-300">
            List Fonts
          </Link>
          <Link to="/create-fonts-group" className="hover:text-gray-300">
            Create Font Group
          </Link>
          <Link to="/list-fonts-group" className="hover:text-gray-300">
            List Font Groups
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
