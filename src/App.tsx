import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
// import FeedPage from "./components/FeedPage/FeedPage";

function App() {
  return (
    <div className="box-border">
      <BrowserRouter>
        <Routes>
          <Route path="/ethseoul2023-chainfeed/" element={<Home />} />
          <Route
            path="/*"
            element={<Navigate to="/ethseoul2023-chainfeed/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
