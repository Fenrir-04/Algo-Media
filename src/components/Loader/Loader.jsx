
import styles from './Loader.module.css';

const Loader = () => {
    return (<>
        <div className={styles.overlay}></div>
        <span className={styles.loader}></span>
    </>
    )
}

export default Loader