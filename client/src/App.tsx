import { Navbar } from "./Components/Navbar";
import { Homepage } from "./routes/Homepage";
import { Fainas } from "./routes/Fainas";
import { Footer } from "./Components/Footer"
import { Home } from "./Components/Home";
import { CreateTodo } from "./routes/CreateTodo";
import { EditTodo } from "./routes/EditTodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <Router>
      <Navbar />
      <main className="flex flex-row justify-center min-h-[80vh] shadow-lg">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/fainas" element={<Fainas/>} />
          <Route path="/criar-faina" element={<CreateTodo/>} />
          <Route path="/editar-faina/:id" element={<EditTodo/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
