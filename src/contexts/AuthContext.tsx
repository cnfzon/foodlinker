'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 定義使用者資料型別
interface User {
  username: string;
  role: 'admin' | 'user';
  loginTime: string;
  permissions: string[];
}

// 定義 Context 型別
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  hasPermission: (permission: string) => boolean;
}

// 創建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 預設權限設定
const DEFAULT_PERMISSIONS = {
  admin: ['view_map', 'view_dashboard', 'view_scale', 'view_redeem', 'edit_profile'],
  user: ['view_map', 'view_scale', 'view_redeem']
};

// Provider 元件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 初始化時從 localStorage 讀取使用者資料
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // 檢查登入時間是否超過 24 小時
        const loginTime = new Date(parsedUser.loginTime);
        const now = new Date();
        if (now.getTime() - loginTime.getTime() > 24 * 60 * 60 * 1000) {
          // 超過 24 小時，自動登出
          localStorage.removeItem('user');
          setUser(null);
        } else {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('解析使用者資料失敗:', error);
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  // 檢查權限
  /*const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };
*/
    const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    // 安全檢查：若 user.permissions 為 undefined，預設回傳空陣列
     const permissions = user.permissions || [];
     return permissions.includes(permission);
    };

  // 登入函數
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      // 這裡模擬登入驗證，實際應用中應該呼叫 API
      if (username === 'admin' && password === '1234') {
        const userData: User = {
          username,
          role: 'admin',
          loginTime: new Date().toISOString(),
          permissions: DEFAULT_PERMISSIONS.admin
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/profile');
        return true;
      } else if (username === 'user' && password === '1234') {
        const userData: User = {
          username,
          role: 'user',
          loginTime: new Date().toISOString(),
          permissions: DEFAULT_PERMISSIONS.user
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/profile');
        return true;
      } else {
        setError('帳號或密碼錯誤');
        return false;
      }
    } catch (error) {
      setError('登入過程發生錯誤');
      return false;
    }
  };

  // 登出函數
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      error,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自定義 Hook 用於使用 Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
} 