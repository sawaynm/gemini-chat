export default function Header() {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 shadow-md" role="banner">
      <h1 className="text-lg font-bold">Gemini Chatbox</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:underline">Home</a></li>
          <li><a href="/about" className="text-white hover:underline">About</a></li>
          <li><a href="/contact" className="text-white hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
