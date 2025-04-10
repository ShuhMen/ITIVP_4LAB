import React, { useState } from "react";

const JokeApp = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setJoke(null);
    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/Programming");
      const data = await response.json();

      if (data.type === "single") {
        setJoke(data.joke);
      } else if (data.type === "twopart") {
        setJoke(`${data.setup}\n${data.delivery}`);
      } else {
        setJoke("Не удалось загрузить ");
      }
    } catch (error) {
      setJoke("Произошла ошибка при получении шутки.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎭 Случайная шутка</h1>
        <button onClick={fetchJoke} style={styles.button}>
          {loading ? "Загружаем..." : "Получить шутку"}
        </button>
        {joke && (
          <div style={styles.jokeBox}>
            <pre style={styles.jokeText}>{joke}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    padding: "40px",
    maxWidth: "50%",
    width: "100%",
    textAlign: "center",
    transition: "0.3s ease-in-out",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    wordBreak: "break-word" 

  },
  button: {
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    padding: "12px 8%",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  jokeBox: {
    marginTop: "30px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    whiteSpace: "pre-wrap",
  },
  jokeText: {
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",       
    wordBreak: "break-word" 
  },

};

export default JokeApp;