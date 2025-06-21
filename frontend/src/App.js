import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Scripture from './components/Scripture/Scripture/Scripture';
import ScriptureForm from './components/Scripture/ScriptureForm/ScriptureForm';
import BookChapterLayout from './components/Chapter/BookChapterLayout/BookChapterLayout';
import AncientVersesComponent from './components/Verse/AncientVersesComponent/AncientVersesComponent';
import AncientVerseSuggester from './components/VerseSuggestion/AncientVerseSuggester';

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/scripture" element={<Scripture />} />
          <Route path="/scriptureForm" element={<ScriptureForm />} />
          <Route path="/chapter" element={<BookChapterLayout />}></Route>
          <Route path="/verse" element={<AncientVersesComponent />}></Route>
          <Route path="/ai" element={<AncientVerseSuggester />}></Route>
        </Routes>
      </Router>

    </>

  );
}

export default App;
