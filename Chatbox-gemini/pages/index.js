import Head from 'next/head';
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gemini Chatbox</title>
        <meta name="description" content="A modern chat interface powered by Google's Gemini AI models." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <ChatBox />
        </main>
      </div>
    </>
  );
}
