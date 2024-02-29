import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ItemList from "./features/Cards/ItemList";
import Navbar from "./components/Navbar";
import Pagination from "./features/Pagination/Pagination";
import Bottom from "./components/Bottom";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-primary-subtle">
      <Navbar />
      <Routes>
        <Route
          exact path="/"
          element={
            <>
              <Pagination />
              <ItemList />
            </>
          }
        />
        <Route
          path="/:page"
          element={
            <>
              <Pagination />
              <ItemList />
            </>
          }
        />
      </Routes>
      <Bottom />
    </div>
  );
}

export default App;
