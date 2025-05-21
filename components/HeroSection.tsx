import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1>讓每一份食物都不被浪費</h1>
      <p>加入 FoodLinker，讓剩食成為溫暖的連結。</p>
      <button className={styles.cta}>立即開始</button>
    </section>
  );
} 