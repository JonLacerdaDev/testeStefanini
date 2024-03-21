import '../styles/main.scss';
import CharacterList from './CharacterList/CharacterList.tsx';
import Logo from '../assets/logo.png';

const App = () => {
  return (
    <div className="container">
      <header>
        <img src={Logo} alt="Harry Potter" />
        <h1>Harry Potter</h1>
      </header>
      <CharacterList />
    </div>
  );
}

export default App;
