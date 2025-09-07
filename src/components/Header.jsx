import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";

export default function Header() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const { fetchData } = useFetch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function userLogout() {
    fetchData(`${baseUrl}/user/logout`, {
      method: "POST",
    });

    logout();

    navigate("/", { replace: true });
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h3 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Product Feedback Portal
          </h3>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              Add Feedback
            </NavLink>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              Feedback List
            </NavLink>
            <button
              onClick={userLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <NavLink
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Add Feedback
          </NavLink>
          <NavLink
            to="/feedback"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Feedback List
          </NavLink>
          <button
            onClick={() => {
              userLogout();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
