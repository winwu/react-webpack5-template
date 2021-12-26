import styles from './App.css';
import demoImage from '../assets/something.png';

const App = () => {
    return (
        <div className={styles.hello}>
            <h1>Applications</h1>
            <img src={demoImage} alt="type something" />
        </div>
    );
};

export default App;
