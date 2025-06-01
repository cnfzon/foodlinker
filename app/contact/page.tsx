'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
  // 表單狀態管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 處理表單輸入變更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理表單提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表單驗證
    if (!formData.name || !formData.email || !formData.message) {
      alert('請填寫所有必填欄位');
      return;
    }

    // 模擬表單提交
    alert('感謝您的留言！我們會盡快回覆您。');
    
    // 重置表單
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className={styles.container}>
      {/* 頁面標題 */}
      <h1 className={styles.title}>聯絡我們</h1>

      <div className={styles.content}>
        {/* 聯絡資訊區塊 */}
        <section className={styles.contactInfo}>
          <h2 className={styles.infoTitle}>聯絡資訊</h2>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div>
                <h3>Email</h3>
                <p>contact@foodlinker.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <h3>電話</h3>
                <p>(02) 1234-5678</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🏢</span>
              <div>
                <h3>地址</h3>
                <p>台北市信義區信義路五段 7 號</p>
              </div>
            </div>
          </div>
        </section>

        {/* 聯絡表單區塊 */}
        <section className={styles.contactForm}>
          <h2 className={styles.formTitle}>聯絡表單</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="請輸入您的姓名"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="請輸入您的 Email"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                留言內容
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="請輸入您的留言內容"
                rows={5}
                className={styles.textarea}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              送出訊息
            </button>
          </form>
        </section>
      </div>
    </div>
  );
} 