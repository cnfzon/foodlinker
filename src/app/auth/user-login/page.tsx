'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login.module.css';

export default function UserLoginPage() {
  // 初始化路由和狀態
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // 處理表單輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理表單提交
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // 驗證表單
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('請填寫所有欄位');
      return;
    }

    // 模擬登入成功
    // 將使用者資訊存入 localStorage
    localStorage.setItem('user', JSON.stringify({
      username: formData.username,
      role: 'user',
      loginTime: new Date().toISOString()
    }));

    // 跳轉到儀表板
    router.push('/dashboard');
  };

  return (
    // 頁面背景容器
    <section className={styles.bg}>
      {/* 主要內容容器 */}
      <div className={styles.container}>
        {/* 左側圖片區域 */}
        <div className={styles.leftSection}>
          <div className={styles.illustration}>
            <img 
              src="/login_illustration.png" 
              alt="登入插圖" 
            />
          </div>
        </div>

        {/* 右側表單區域 */}
        <div className={styles.rightSection}>
          <div className={styles.card}>
            {/* 標題區域 */}
            <h1 className={styles.title}>一般使用者登入</h1>
            <p className={styles.subtitle}>請輸入您的帳號密碼</p>

            {/* 登入表單 */}
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* 帳號輸入欄位 */}
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                  帳號
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="請輸入帳號"
                />
              </div>

              {/* 密碼輸入欄位 */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  密碼
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="請輸入密碼"
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
                className={styles.googleBtn}
              >
                登入
              </button>

              {/* 返回按鈕 */}
              <button 
                type="button" 
                className={styles.roleBtn}
                onClick={() => router.back()}
              >
                返回
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 