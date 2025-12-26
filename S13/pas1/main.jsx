import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>Home</h2>
      <button onClick={() => navigate("/tasks")}>Go to Tasks</button>
      <br /><br />
      <button onClick={() => navigate("/about")}>Go to About</button>
    </>
  );
};

const Tasks = () => {
  const { id } = useParams();

  return (
    <>
      <h2>Tasks</h2>
      <p>Id: {id ? id : "fără id"}</p>
    </>
  );
};

const About = () => {
  return (
    <>
      <h2>About</h2>
      <p>Aceasta este pagina About.</p>
    </>
  );
};

const NotFound = () => {
  return <h2>404 - Page Not Found</h2>;
};



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<Tasks />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
