import styles from './login.module.css';

export default function LoginPage() {
  return (
    <section className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.illustration}>
          <img src="/login_illustration.png" alt="登入插圖" style={{ width: '350px', height: 'auto', marginRight: '2rem' }} />
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>一起加入 FoodLinker</h1>
          <p className={styles.subtitle}>讓剩食找到價值，讓行動連結彼此</p>
          <button className={styles.googleBtn}>以 Google 帳號登入</button>
          <div className={styles.roles}>
            <span>登入方式：</span>
            <button className={styles.roleBtn}>一般使用者</button>
            <button className={styles.roleBtn}>店家</button>
            <button className={styles.roleBtn}>公益機構</button>
          </div>
        </div>
      </div>
    </section>
  );
} 