import styles from './rewards.module.css';

export default function RewardsPage() {
  return (
    <section className={styles.bg}>
      <div className={styles.box}>
        <div className={styles.slogan}>一起創造不浪費的社會</div>
        <h1 className={styles.title}>積分兌換</h1>
        <div className={styles.items}>
          <div className={styles.item}>環保袋（50分）<button className={styles.button}>兌換</button></div>
          <div className={styles.item}>咖啡券（30分）<button className={styles.button}>兌換</button></div>
        </div>
        <div className={styles.history}>
          <h2 className={styles.historyTitle}>兌換紀錄</h2>
          <ul className={styles.historyList}>
            <li>2024/06/01 兌換「環保袋」</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 