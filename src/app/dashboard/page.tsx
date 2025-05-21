import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <section className={styles.bg}>
      <div className={styles.box}>
        <div className={styles.slogan}>一起創造不浪費的社會</div>
        <h1 className={styles.title}>我的儀表板</h1>
        <div className={styles.points}>目前積分：<b>120</b></div>
        <div className={styles.section}>
          <h2>上傳紀錄</h2>
          <ul>
            <li>2024/06/01 麵包（3份）</li>
            <li>2024/05/28 蔬菜（2份）</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>最近活動</h2>
          <ul>
            <li>2024/06/01 兌換「環保袋」</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 