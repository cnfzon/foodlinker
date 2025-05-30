'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './profile.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // 檢查登入狀態
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // 如果未登入，不渲染內容
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        {/* 頁面標題 */}
        <h1 className={styles.title}>個人資料</h1>

        {/* 使用者資訊區塊 */}
        <div className={styles.infoSection}>
          <div className={styles.infoGroup}>
            <label className={styles.label}>帳號名稱</label>
            <div className={styles.value}>{user.username}</div>
          </div>

          <div className={styles.infoGroup}>
            <label className={styles.label}>帳號類型</label>
            <div className={styles.value}>{user.role}</div>
          </div>

          <div className={styles.infoGroup}>
            <label className={styles.label}>登入時間</label>
            <div className={styles.value}>
              {new Date(user.loginTime).toLocaleString('zh-TW')}
            </div>
          </div>
        </div>

        {/* 功能按鈕區塊 */}
        <div className={styles.actions}>
          <button 
            className={styles.editButton}
            onClick={() => router.push('/profile/edit')}
          >
            編輯資料
          </button>
          <button 
            className={styles.historyButton}
            onClick={() => router.push('/profile/history')}
          >
            查看歷史紀錄
          </button>
        </div>

        {/* 預留擴充區域 */}
        <div className={styles.placeholder}>
          <h2 className={styles.subtitle}>未來功能</h2>
          <ul className={styles.featureList}>
            <li>個人資料編輯</li>
            <li>活動歷史紀錄</li>
            <li>收藏清單</li>
            <li>通知設定</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 