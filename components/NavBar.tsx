import styles from './NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
  // TODO: 串接 NextAuth 狀態
  const isLogin = false; // 模擬登入狀態
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">FoodLinker</Link>
      </div>
      <ul className={styles.menu}>
        <li><Link href="/map">地圖</Link></li>
        <li><Link href="/dashboard">儀表板</Link></li>
        <li><Link href="/weigh">秤重</Link></li>
        <li><Link href="/rewards">兌換</Link></li>
        {isLogin ? (
          <li><button className={styles.authBtn}>登出</button></li>
        ) : (
          <li><Link href="/auth/login" className={styles.authBtn}>登入</Link></li>
        )}
      </ul>
    </nav>
  );
} 