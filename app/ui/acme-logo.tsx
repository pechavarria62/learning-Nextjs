import { GlobeAltIcon } from '@heroicons/react/24/outline';
import styles from './nav-links.module.css'

export default function AcmeLogo() {
  return (
    <div className={styles.links}>
      <GlobeAltIcon 
      className={styles.icon}
      // style={{
      //   height: '20px', 
      //   width:'20px', 
      //   offsetRotate:'15deg', 
      //   color:'blue',
      //   textDecoration:'none',
      // }} 
      />
      <p className={styles.links}>Acme</p>
    </div>
  );
}
