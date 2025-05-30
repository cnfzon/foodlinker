'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './NavBar.module.css';

// 定義導航項目
const NAV_ITEMS = [
  { path: '/', label: '首頁', requiresAuth: false },
  { path: '/recipes', label: '食譜', requiresAuth: false },
  { path: '/map', label: '地圖', requiresAuth: true },
  { path: '/dashboard', label: '儀表板', requiresAuth: true },
  { path: '/weigh', label: '秤重', requiresAuth: true },
  { path: '/rewards', label: '兌換', requiresAuth: true },
  { path: '/about', label: '關於我們', requiresAuth: false },
  { path: '/contact', label: '聯絡我們', requiresAuth: false }
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  
  // 下拉選單狀態管理
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 處理點擊外部區域關閉下拉選單
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 處理登入按鈕點擊
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  // 處理使用者名稱按鈕點擊
  const handleUserButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 處理個人資料點擊
  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    router.push('/profile');
  };

  // 處理登出
  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  // 處理需要登入的導航項目點擊
  const handleProtectedNavClick = (e: React.MouseEvent, requiresAuth: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      e.preventDefault();
      // 使用瀏覽器原生的 alert 提示
      alert('請先登入後再使用此功能');
      // 或者使用更現代的提示方式，例如 toast
      // toast('請先登入後再使用此功能', { type: 'warning' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo 區域 */}
        <Link href="/" className={styles.logo}>
          FoodLinker
        </Link>

        {/* 導覽連結區域 */}
        <div className={styles.links}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || 
                           (item.path !== '/' && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                onClick={(e) => handleProtectedNavClick(e, item.requiresAuth)}
              >
                {item.label}
                {item.requiresAuth && !isAuthenticated && (
                  <span className={styles.lockIcon} title="需要登入">🔒</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* 使用者區域 */}
        <div className={styles.userSection}>
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              {/* 使用者名稱按鈕 */}
              <button 
                ref={buttonRef}
                className={`${styles.userButton} ${isDropdownOpen ? styles.active : ''}`}
                onClick={handleUserButtonClick}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {user?.username}
                <span className={styles.arrow} />
              </button>
              
              {/* 下拉選單 */}
              {isDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className={styles.dropdown}
                  role="menu"
                >
                  <button 
                    className={styles.dropdownItem}
                    onClick={handleProfileClick}
                    role="menuitem"
                  >
                    個人資料
                  </button>
                  <button 
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    登出
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className={styles.loginButton}
              onClick={handleLoginClick}
            >
              登入
            </button>
          )}
        </div>
      </div>
    </nav>
  );
} 