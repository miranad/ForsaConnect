import { useEffect, useState } from 'react';
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { onSnapshot } from 'firebase/firestore';
import { adminRoleRef } from '../lib/adminAccess';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(Boolean(auth));
  useEffect(() => {
    if (!auth) return;
    let generation = 0;
    let stopRole = () => {};
    const stop = onIdTokenChanged(auth, async user => {
      const current = ++generation;
      stopRole(); stopRole = () => {};
      setIsAdmin(false);
      setLoading(true);
      try {
        const token = user ? await user.getIdTokenResult() : null;
        if (current !== generation || !user?.emailVerified) return;
        if (token?.claims.admin === true) { setIsAdmin(true); return; }
        const ref = adminRoleRef(user.uid);
        if (ref) stopRole = onSnapshot(ref, { includeMetadataChanges: true }, snapshot => {
          if (current === generation) setIsAdmin(!snapshot.metadata.fromCache && snapshot.exists() && snapshot.data().active === true);
        }, () => { if (current === generation) setIsAdmin(false); });
      } catch {
        if (current === generation) setIsAdmin(false);
      } finally {
        if (current === generation) setLoading(false);
      }
    });
    return () => { generation++; stopRole(); stop(); };
  }, []);
  return { isAdmin, loading, logout: () => auth ? signOut(auth) : Promise.resolve() };
}
