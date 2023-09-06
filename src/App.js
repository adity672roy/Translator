import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = async () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOutput(data.translatedText);
      } else {
        console.error("Translation request failed");
      }
    } catch (error) {
      console.error("An error occurred while translating:", error);
    }
  };

  useEffect(() => {
    api();
  }, []);

  const api = async () => {
    const res = await fetch("https://libretranslate.de/languages");
    const data = await res.json();
    console.log(data);
    setOptions(data);
  };
  return (
    <div className="app">
      <h1>TRANSLATOR</h1>
      <div>
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="5"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="5" value={output}></textarea>
      </div>
      <div>
        <button onClick={(e) => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
