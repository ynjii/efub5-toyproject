import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TweetDetailPage from './pages/TweetDetailPage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tweet/:id" element={<TweetDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;