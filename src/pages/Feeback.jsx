import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router";

function Feedback() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  let navigate = useNavigate();
  const { loading, error, fetchData } = useFetch();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchData(`${baseUrl}/feedback?page=${page}`);
        setFeedbackList(response.data);
        setLastPage(response.last_page);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [page]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>
          <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mb-4"></span>
        </div>
      )}

      <h1 className="text-2xl flex justify-center items-center mt-5">
        Feedback
      </h1>
      <ul className="w-full max-w-xl mx-auto space-y-4">
        {error ? (
          <span className="text-red-600 flex items-center justify-center">
            {error}
          </span>
        ) : (
          ""
        )}
        {feedbackList?.length ? (
          feedbackList?.map((feedback) => (
            <li
              key={feedback.id}
              className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col gap-3"
              onClick={() =>
                navigate(`/feedback/${feedback.id}`, { state: { feedback } })
              }
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {feedback.title}
              </h3>
              {feedback.description && (
                <p className="text-gray-600 text-sm mt-2">
                  {feedback.description}
                </p>
              )}
              <div className="flex justify-end text-sm text-gray-500 mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full w-max">
                  {feedback.category.category_name}
                </span>

                <span className="font-medium text-gray-500 text-sm ml-3">
                  Author: {feedback.user.name}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="p-6 text-center text-gray-500 font-medium">
            No feedback found
          </li>
        )}
      </ul>

      <div className="flex justify-center items-center gap-3 mt-6 mb-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Prev
        </button>

        <span className="text-gray-700 font-medium">
          {page} / {lastPage}
        </span>

        <button
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Feedback;
