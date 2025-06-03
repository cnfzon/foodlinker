import styles from './weigh.module.css';

export default function WeighPage() {
  return (
    <section className={styles.bg}>
      <div className={styles.box}>
        <div className={styles.sloganMain}>一起創造不浪費的社會</div>
        <div className={styles.slogan}>讓剩食轉化為永續價值</div>
        <h1 className={styles.title}>廚餘秤重回報</h1>
        <form className={styles.form}>
          <input className={styles.input} type="number" placeholder="請輸入重量 (g)" />
          <label className={styles.uploadLabel}>
            上傳食物圖片
            <input className={styles.fileInput} type="file" accept="image/*" />
          </label>
          <button className={styles.submitBtn} type="submit">送出</button>
        </form>
        <div className={styles.historyBox}>
          <h2 className={styles.historyTitle}>過去上傳記錄</h2>
          <ul className={styles.historyList}>
            <li>2024/06/01　1.2kg</li>
            <li>2024/05/28　0.8kg</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 