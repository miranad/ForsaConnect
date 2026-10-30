import { useEffect, useState } from 'react';
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(Boolean(auth));
  useEffect(() => {
    if (!auth) return;
    let generation = 0;
    const stop = onIdTokenChanged(auth, async user => {
      const current = ++generation;
      setIsAdmin(false);
      try {
        const token = user ? await user.getIdTokenResult() : null;
        if (current === generation) setIsAdmin(Boolean(user?.emailVerified && token?.claims.admin === true));
      } catch {
        if (current === generation) setIsAdmin(false);
      } finally {
        if (current === generation) setLoading(false);
      }
    });
    return () => { generation++; stop(); };
  }, []);
  return { isAdmin, loading, logout: () => auth ? signOut(auth) : Promise.resolve() };
}
