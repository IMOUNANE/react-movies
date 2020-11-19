import React, {useState} from 'react';
import ResultCard from '../ResultCard/ResultCard';

function SearchBar() {

  const [query, setQuery] = useState("");
  const [results, setResults ] = useState ([]);

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4124c5b3a60d237f9660517b3f1fc767&language=en-US&page=1&query=${e.target.value}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      if(!data.errors) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    });
  };

  return (
    <div className="container">
      <div className="add-content">
        <div className = "input-wrapper">
          <input type="text"
          placeholder="Search ..."
          value={query}
          onChange={onChange}
          />
        </div>
        
        {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default SearchBar;