import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import logo from "../images/pokelogo.png"

function landingPage() {
    
    return (
        <div className={styles.background}>
            <div>
                <img className={styles.logo} src={logo} alt="logo" />
                
                <Link to="/home">
                <p className={styles.title}>Start</p>
                    <div className={`${styles.pokeball} ${styles.animated}`}></div>
                </Link>
            </div>
            
        </div>
    )
}

export default landingPage;