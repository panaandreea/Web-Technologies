import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return <h2>Home page</h2>;
}

function Tasks() {
  return <h2>Tasks page</h2>;
}

function About() {
  return <h2>About page</h2>;
}

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
