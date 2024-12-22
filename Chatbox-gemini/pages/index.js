// chatbox-gemini/src/pages/index.js

import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <ChatBox />
      </main>
    </div>
  );
}