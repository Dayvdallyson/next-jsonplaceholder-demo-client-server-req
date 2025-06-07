"use client";

import { useState } from "react";

export default function SendPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, userId: 1 }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <h1>Enviar Post (client-side)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Corpo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {response && (
        <div className="mt-4">
          <h2>Resposta da API:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
