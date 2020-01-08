import React, { useState, useEffect } from "react";

const api =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [length, setLength] = useState(null);

  const handleClick = () => {
    return Math.floor(Math.random() * length);
  };

  const fetchQuotes = () => {
    return fetch(api)
      .then(res => res.json())
      .then(json => {
        const data = {
          quotes: json.quotes,
          length: json.quotes.length
        };
        setQuotes(json.quotes);
        setLength(json.quotes.length);
        return data;
      })
      .then(data => {
        let random = handleClick();
        setQuote(data.quotes[random].quote);
        setAuthor(data.quotes[random].author);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div id="quote-box">
      <div id="text">
        <p>{loading ? "Loading" : quote}</p>
      </div>
      <div id="author">
        <p>{loading ? "..." : author}</p>
      </div>
      <div className="controls">
        <div id="new-quote">
          <button onClick={() => fetchQuotes()}>New Quote</button>
        </div>
        <div>
          <a
            id="tweet-quote"
            href={
              "https://twitter.com/intent/tweet?hashtags=freecodecamp,quote&related=freecodecamp&text=" +
              quote
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            tweet
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
