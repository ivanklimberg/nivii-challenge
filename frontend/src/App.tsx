import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { BrowserRouter, Routes, Route } from "react-router";

import MainLayout from "./components/MainLayout";
import Home from "./routes/Home";
import QuestionHistoryList from "./routes/QuestionHistoryList";
import QuestionHistoryItem from "./routes/QuestionHistoryItem";

ChartJS.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/questions-history" element={<QuestionHistoryList />} />
          <Route
            path="/questions-history/:id"
            element={<QuestionHistoryItem />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
