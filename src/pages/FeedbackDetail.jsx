import { useLocation, useParams } from "react-router";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

function FeedbackDetail() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const { feedback } = location.state;
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const { id } = useParams();
  const { error, fetchData } = useFetch();

  const submitComment = async () => {
    const response = await fetchData(`${baseUrl}/feedback/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ comment: comment }),
    });
    if (response.success) {
      setComment("");
      loadComments();
    }
  };

  const loadComments = async () => {
    const response = await fetchData(`${baseUrl}/feedback/${id}/comments`);
    if (response.success) {
      setCommentList(response.data);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {feedback.title}
        </h1>

        {feedback.description && (
          <p className="text-gray-700 leading-relaxed">
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
      </div>
      <h4 className="max-w-md mx-auto text-xl font-semibold text-gray-800 mb-4 mt-4 border-b pb-2 flex items-center justify-between">
        <span>Comments</span>
        <span className="text-sm font-medium text-gray-500">
          {commentList?.length || 0}
        </span>
      </h4>
      {error ? (
        <span className="text-red-600 flex items-center justify-center">
          {error}
        </span>
      ) : (
        ""
      )}
      <ul className="max-w-md mx-auto space-y-4 mt-4">
        {commentList?.length ? (
          commentList.map((comment) => (
            <li
              key={comment.id}
              className="p-4 bg-white border-l-4 border-blue-500 rounded-md shadow-sm mb-3"
            >
              <p className="text-gray-800 mb-2 bold italic">
                {comment.comment}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Author : {comment.user?.name || "Anonymous"}</span>
                <span>{new Date(comment.created_at).toLocaleString()}</span>
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">No comments found</li>
        )}
      </ul>

      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-5">
        {error ? (
          <span className="text-red-600 flex justify-center items-center mb-3">
            {error}
          </span>
        ) : (
          ""
        )}
        <FormInput
          type="textarea"
          name="description"
          label="Add Comment"
          value={comment}
          handleOnChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={!comment.trim()}
          className={`w-full py-2 px-4 rounded transition-colors ${
            comment.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={submitComment}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default FeedbackDetail;
