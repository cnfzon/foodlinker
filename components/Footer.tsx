import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
      <img src="/foodlinker_corner.png" alt="FoodLinker Logo" className="cornerLogo"/>
      </div>
      <div className={styles.columns}>
        <div>
          <h4>平台</h4>
          <p>地圖</p>
          <p>儀表板</p>
        </div>
        <div>
          <h4>資源</h4>
          <p>支援</p>
          <p>常見問題</p>
        </div>
        <div>
          <h4>聯絡我們</h4>
          <p>隱私權</p>
          <p>媒體報導</p>
        </div>
      </div>
    </footer>
  );
} 