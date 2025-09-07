import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { useFetch } from "../hooks/useFetch";
import { validate, validateField } from "../helpers/validate";

function Dashboard() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { loading, error, fetchData } = useFetch();

  const [formError, setFormError] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await fetchData(`${baseUrl}/categories`);
        setCategories(categories.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    const fieldError = validateField(e.target.name, e.target.value, formData);
    setFormError((prev) => ({ ...prev, [e.target.name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormError(validationErrors);
      return;
    }

    setLoader(true);
    setFormError({});
    try {
      const response = await fetchData(`${baseUrl}/feedback`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response?.success) {
        setFormData({ title: "", description: "", category: "" });
        setSuccessMessage(response?.message);

        const timer = setTimeout(() => setSuccessMessage(""), 2000);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>
          <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mb-4"></span>
        </div>
      )}

      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Feedback</h2>
        {successMessage && (
          <span className="text-green-600 flex justify-center items-center">
            {successMessage}
          </span>
        )}
        {error ? (
          <span className="text-red-600 flex items-center justify-center">
            {error}
          </span>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FormInput
              type="text"
              name="title"
              label="Title"
              value={formData.title}
              handleOnChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formError.title && (
              <p className="text-red-600 mt-1">{formError.title}</p>
            )}
          </div>

          <div className="mb-4">
            <FormInput
              type="textarea"
              name="description"
              label="Description"
              value={formData.description}
              handleOnChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleOnChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="text-red-600 mt-1">{formError.category}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loader}
            className={`w-full py-2.5 rounded-lg font-medium transition ${
              loader
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {loader ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
