import PropTypes from "prop-types";

export default function ChatMessage({ message, role }) {
  return (
    <div
      className={`mb-4 p-4 rounded-lg shadow-md ${
        role === "user"
          ? "bg-blue-100 text-blue-900"
          : "bg-gray-100 text-gray-800"
      }`}
      role="alert" // Added ARIA role for accessibility
    >
      <p>{message}</p>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
