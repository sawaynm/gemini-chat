export default function ChatMessage({ message, role }) {
  return (
    <div
      className={`mb-4 p-4 rounded-lg shadow-md ${
        role === "user"
          ? "bg-blue-100 text-blue-900"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <p>{message}</p>
    </div>
  );
}