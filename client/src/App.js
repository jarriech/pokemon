import styles from './App.css';
import React from 'react'
import { Route } from "react-router-dom"
import CreatePokemon from "./components/Create";
import Home from './components/Home';
import PokeDetail from './components/PokeDetail';
import landingPage from './components/LandingPage';
//import Footer from "./components/Footer"

function App() {
  return (
    <div className={styles.App}>
      <Route path="/" exact component={landingPage} />
      <Route path="/home" exact component={Home} />
      <Route path="/create" exact component={CreatePokemon} />
      <Route path="/home/:id" exact component={PokeDetail} />
    
    
    </div>
  );
}

export default App;
