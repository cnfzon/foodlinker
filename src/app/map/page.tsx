import styles from './map.module.css';

export default function MapPage() {
  return (
    <section className={styles.bg}>
      <div className={styles.box}>
        <div className={styles.slogan}>一起創造不浪費的社會</div>
        <h1 className={styles.title}>惜食地圖</h1>
        <input className={styles.search} placeholder="搜尋地點或食物..." />
        <div className={styles.mapEmbed}>[Google Maps API 區塊]</div>
        <ul className={styles.list}>
          {/* 假資料範例 */}
          <li>全聯福利中心（麵包 5 份）</li>
          <li>家樂福（蔬菜 10 份）</li>
          <li>台北食物銀行（罐頭 20 份）</li>
        </ul>
      </div>
    </section>
  );
} 