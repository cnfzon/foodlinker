import styles from './VisionSection.module.css';

export default function VisionSection() {
  return (
    <section className={styles.vision}>
      <h2>我們的願景</h2>
      <p>我們致力於讓每一份食物都能被善用，讓每個人都能溫飽。</p>
      <div className={styles.cards}>
        <div className={styles.card}>
          <span>🍱</span>
          <p>分享剩食</p>
        </div>
        <div className={styles.card}>
          <span>⚖️</span>
          <p>回報廚餘</p>
        </div>
        <div className={styles.card}>
          <span>🏅</span>
          <p>積分兌換</p>
        </div>
      </div>
    </section>
  );
} 