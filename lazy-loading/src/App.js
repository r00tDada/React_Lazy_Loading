import "./App.css";
import React from "react";
import LazyImageLoading from "./components/Lazy_loading/LazyImageLoading";
import InfiniteScroll from "./components/Lazy_loading/InfiniteScroll";

function App() {
  return (
    <div className="App">
      <LazyImageLoading />
      {/* <InfiniteScroll /> */}
    </div>
  );
}

export default App;
