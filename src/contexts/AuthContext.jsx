import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .single();
    return data;
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setProfile({
          id: session.user.id,
          email: session.user.email,
          role: 'admin',
          full_name: session.user.user_metadata?.full_name || '',
        });
        fetchProfile(session.user.id).then((p) => {
          if (p) setProfile(p);
        }).catch(console.error);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    setUser(data.user);
    setProfile({
      id: data.user.id,
      email: data.user.email,
      role: 'admin',
      full_name: data.user.user_metadata?.full_name || '',
    });

    const p = await fetchProfile(data.user.id);
    if (p) setProfile(p);
    return { success: true };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
