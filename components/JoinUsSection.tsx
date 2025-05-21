import styles from './JoinUsSection.module.css';

export default function JoinUsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <h2 className={styles.title}>加入我們！</h2>
        <p className={styles.desc}>歡迎志工、商家與公益團體一同參與。</p>
        <button className={styles.button}>了解更多</button>
      </div>
      <div className={styles.imgCol}>
        <img
          src="/join_section.png"
          alt="志工插圖"
          className={styles.image}
        />
      </div>
    </section>
  );
} 