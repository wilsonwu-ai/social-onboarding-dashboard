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

// Mock credentials for demo
const VALID_CREDENTIALS = [
  { email: 'admin@company.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { email: 'staff@company.com', password: 'staff123', name: 'Staff Member', role: 'staff' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dashboard_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const validUser = VALID_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
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
