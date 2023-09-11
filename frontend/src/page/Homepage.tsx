import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import './style/GlobalStyle.css';

const Homepage: React.FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/books/")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(books);

  return (
    <div className="body">
      <div className="content">
        <HeaderComponent />
        <h1>Books</h1>
        <ul>
          {books.map((book: any) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Homepage;