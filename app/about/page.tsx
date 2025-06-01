'use client';

import Image from 'next/image';
import styles from './about.module.css';

// 團隊成員資料
const TEAM_MEMBERS = [
  {
    name: 'KomEi',
    title: '策劃&發起人',
    description: '擁有 19 年天龍人的經驗，南勢角地頭蛇。',
    image: '/team/member1.jpg'
  },
  {
    name: 'Cnfzon',
    title: '策劃&web全端開發',
    description: '左右兩邊都是電神',
    image: '/team/member2.jpg'
  },
  {
    name: 'Eric',
    title: '策劃&硬體開發',
    description: '台中南區一根刺',
    image: '/team/member3.jpg'
  }
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* 頁面標題 */}
      <h1 className={styles.title}>關於 FoodLinker</h1>

      {/* 主要內容區塊 */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <p className={styles.description}>
              FoodLinker 是一個以惜食為核心理念的平台，致力於將剩餘資源妥善分配，
              讓每份食物都能發揮價值，實現「不浪費、不浪費」的目標。
            </p>
            <div className={styles.mission}>
              <h2 className={styles.subtitle}>我們的使命</h2>
              <p>
                透過科技的力量，我們希望建立一個更永續的食物生態系統，
                讓每個人都能參與其中，共同創造更美好的未來。
              </p>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/about/hero.jpg"
              alt="FoodLinker 團隊"
              width={500}
              height={300}
              className={styles.image}
            />
          </div>
        </div>
      </section>

      {/* 團隊介紹區塊 */}
      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>我們的團隊</h2>
        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.teamImage}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className={styles.memberImage}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberTitle}>{member.title}</p>
              <p className={styles.memberDescription}>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 理念說明區塊 */}
      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>我們的理念</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3>永續發展</h3>
            <p>透過科技創新，推動食物資源的永續利用。</p>
          </div>
          <div className={styles.valueCard}>
            <h3>社會責任</h3>
            <p>關注社會需求，創造共享價值的平台。</p>
          </div>
          <div className={styles.valueCard}>
            <h3>創新思維</h3>
            <p>持續探索新的可能性，提供更好的服務。</p>
          </div>
        </div>
      </section>
    </div>
  );
} 