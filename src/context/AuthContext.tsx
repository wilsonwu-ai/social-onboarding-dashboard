import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Valid credentials
const VALID_CREDENTIALS = [
  { email: 'wilson.wu@gosnappy.io', password: 'snappy2026', name: 'Wilson Wu', role: 'admin' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('dashboard_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed && parsed.email && parsed.name && parsed.role) {
        return parsed as User;
      }
      localStorage.removeItem('dashboard_user');
      return null;
    } catch {
      localStorage.removeItem('dashboard_user');
      return null;
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const validUser = VALID_CREDENTIALS.find(
      cred => cred.email.toLowerCase() === trimmedEmail && cred.password === trimmedPassword
    );

    if (validUser) {
      const userData: User = {
        email: validUser.email,
        name: validUser.name,
        role: validUser.role,
      };
      setUser(userData);
      localStorage.setItem('dashboard_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dashboard_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
