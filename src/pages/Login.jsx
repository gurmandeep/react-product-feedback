import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../AuthContext";
import { validate } from "../helpers/validate";

function Login() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error, fetchData } = useFetch();
  const [formErrors, setFormError] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormError(validationErrors);
      return;
    } else {
      const response = await fetchData(
        `${baseUrl}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
        false
      );
      if (response?.success) {
        login(response.token);
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Login
        </h1>
        {error ? (
          <span className="text-red-600 flex items-center justify-center">
            {error}
          </span>
        ) : (
          ""
        )}
        <div className="mb-5">
          <FormInput
            type="email"
            name="email"
            label="Email"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            handleOnChange={handleOnChange}
            value={formData.email}
          />
          {formErrors.email && (
            <span className="text-red-600">{formErrors.email}</span>
          )}
        </div>
        <div className="mb-5">
          <FormInput
            type="password"
            name="password"
            label="Password"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            handleOnChange={handleOnChange}
            value={formData.password}
          />
          {formErrors.password && (
            <span className="text-red-600">{formErrors.password}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          }`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <NavLink
          to="/register"
          className="flex items-center justify-center pt-5"
        >
          Need to register?
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
