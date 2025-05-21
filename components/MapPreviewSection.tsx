import styles from './MapPreviewSection.module.css';

export default function MapPreviewSection() {
  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <h2 className={styles.title}>惜食地圖</h2>
        <p className={styles.desc}>探索附近的惜食地點，讓資源不再浪費。</p>
        <button className={styles.button}>查看地圖</button>
      </div>
      <div className={styles.imgCol}>
        <img
          src="/map_section.png"
          alt="地圖預覽"
          className={styles.image}
        />
      </div>
    </section>
  );
} 