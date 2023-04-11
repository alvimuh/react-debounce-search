import axios from "axios";
import React from "react";
import "./styles.css";

export default function App() {
  const [keyword, setKeyword] = React.useState("");
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    console.log("🔴 Without debounce search ->", keyword);

    //Debounce search
    const getData = setTimeout(() => {
      console.log("🟢 With debounce search ->", keyword);

      //Fetch data & set data state
      axios
        .get(`https://www.omdbapi.com/?apikey=faf7e5bb&s=${keyword}`)
        .then((response) => {
          if (response.data.Search) setData(response.data.Search);
          else setData([]);
        });
    }, 100); //Delay 0.1 second

    return () => clearTimeout(getData); //cancels a timeout previously
  }, [keyword]);

  return (
    <div className="app">
      <input
        placeholder="Search Movie.. (Marvel, Etc)"
        onChange={(event) => setKeyword(event.target.value)}
        style={{
          width: 400,
          padding: 12,
          fontSize: 18
        }}
      />
      <ul>
        {data.map((item, index) => (
          <li>{item.Title}</li>
        ))}
      </ul>
    </div>
  );
}
