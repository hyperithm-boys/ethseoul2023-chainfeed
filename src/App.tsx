import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import FeedPage from "./components/FeedPage/FeedPage";

function App() {
  return (
    <div className="box-border">
      <BrowserRouter>
        <Routes>
          <Route path="/:table/:id" element={<FeedPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
