import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Yo",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage(""); // Limpiar el campo después de enviar el mensaje
  };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      //setMessages((prevMessages) => [...prevMessages, message]);
      receiveMessage(message);
    });

    return () => socket.off("message");
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="h-screen bg-zinc-700 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-500 p-10 ">
        <h1 className="text-2xl font-bold my-2 justify-center itemms-center ">
          Chat Iluminado
        </h1>

        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table round-md  ${
                message.from === "Yo" ? "bg-sky-600 ml-auto" : "bg-red-700"
              }`}
            >
              <span className="text-xs text-slate-600 block">
                {message.from}
              </span>
              <span className="text-md">{message.body}</span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          //id="mensaje" // Agrega un id único
          name="mensaje" // Agrega un name único
          placeholder="tu mensaje acá"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-red-700"
        />
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default App;
