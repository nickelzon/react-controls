import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useEffect,
  useState,
} from "react";
import "./styles.css";
import { names } from "../Names";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Header = () => <img src="" />;

const Footer = () => (
  <>
    <div className="buttons">
      <button>Joegle Search</button>
      <button>I'm Feeling Lucky</button>
    </div>
    <p>
      <a>Shop final Black Friday device deals</a> on the Joegle Store today.
    </p>
  </>
);

type SearchProps = {
  handleClicked: (name: string) => void;
  handleSearched: ChangeEventHandler<HTMLInputElement>;
  results: string[];
  searchTerm: string;
};

const Search: FC<SearchProps> = ({
  handleSearched,
  handleClicked,
  results,
  searchTerm,
}) => (
  <div className="search">
    <input
      value={searchTerm}
      spellCheck={false}
      type="text"
      onChange={handleSearched}
      placeholder="Search"
    />
    <div className="menu">
      <div>
        {results.map((name) => (
          <button key={name} onClick={() => handleClicked(name)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export const AutoSuggest: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [results, setResults] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearched = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClicked = (name: string) => {
    setSearchTerm(name);
  };

  useEffect(() => {
    const namesCopy = [...names];
    setResults(
      namesCopy.filter(
        (n, i) =>
          searchTerm === "" ||
          n.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [debouncedSearchTerm]);

  return (
    <>
      <Header />
      <Search
        searchTerm={searchTerm}
        handleSearched={handleSearched}
        handleClicked={handleClicked}
        results={results}
      />
      <Footer />
    </>
  );
};
