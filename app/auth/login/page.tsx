'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 如果已經登入，重定向到個人資料頁面
  if (isAuthenticated) {
    router.push('/profile');
    return null;
  }

  // 處理登入表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (!success) {
        // 登入失敗時，密碼欄位清空
        setPassword('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>登入</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 帳號輸入欄位 */}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              帳號
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="請輸入帳號"
              required
            />
          </div>

          {/* 密碼輸入欄位 */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              密碼
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="請輸入密碼"
              required
            />
          </div>

          {/* 錯誤訊息顯示 */}
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {/* 登入按鈕 */}
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? '登入中...' : '登入'}
          </button>

          {/* 測試帳號提示 */}
          <div className={styles.hint}>
            測試帳號：admin / 密碼：1234
          </div>
        </form>
      </div>
    </div>
  );
} 