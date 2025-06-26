import { GlobeAltIcon } from '@heroicons/react/24/outline';
import styles from './nav-links.module.css'

export default function AcmeLogo() {
  return (
    <div className={styles.links}>
      <GlobeAltIcon 
        className={styles.icon}/>
      <p className={`${styles.links} ${styles.acmeText}`}>
        Acme
      </p>
    </div>
  );
}
