
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  role: string;
  is_active: boolean;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      console.log('Checking admin session...');
      const sessionToken = localStorage.getItem('admin_session_token');
      
      if (!sessionToken) {
        console.log('No session token found');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('admin_sessions')
        .select(`
          admin_id,
          expires_at,
          admin_users (
            id,
            username,
            email,
            full_name,
            role,
            is_active
          )
        `)
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error) {
        console.error('Session check error:', error);
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
      } else if (data && data.admin_users) {
        console.log('Valid session found for admin:', data.admin_users);
        setAdminUser(data.admin_users as AdminUser);
      } else {
        console.log('No valid session found');
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      localStorage.removeItem('admin_session_token');
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting admin login for:', username);
      
      // Check if admin user exists and is active
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Admin lookup error:', error);
        return { success: false, error: 'Invalid credentials' };
      }

      if (!adminData) {
        console.log('Admin user not found or inactive');
        return { success: false, error: 'Invalid credentials' };
      }

      // Simple password check (in production, use bcrypt)
      if (password !== 'admin123') {
        console.log('Invalid password');
        return { success: false, error: 'Invalid credentials' };
      }

      // Clean up expired sessions first
      await supabase
        .from('admin_sessions')
        .delete()
        .lt('expires_at', new Date().toISOString());

      // Create new session
      const sessionToken = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

      const { error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          session_token: sessionToken,
          admin_id: adminData.id,
          expires_at: expiresAt.toISOString()
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        return { success: false, error: 'Failed to create session' };
      }

      localStorage.setItem('admin_session_token', sessionToken);
      setAdminUser(adminData);
      console.log('Admin login successful');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out admin...');
      const sessionToken = localStorage.getItem('admin_session_token');
      if (sessionToken) {
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('session_token', sessionToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_session_token');
      setAdminUser(null);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
