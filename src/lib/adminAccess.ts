import type { User } from 'firebase/auth';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './firebase';

export const adminRoleRef = (uid: string) => db ? doc(db, 'administrators', uid) : null;

export async function hasAdminAccess(user: User): Promise<boolean> {
  if (!user.emailVerified) return false;
  const token = await user.getIdTokenResult(true);
  if (token.claims.admin === true) return true;
  const ref = adminRoleRef(user.uid);
  if (!ref) return false;
  const role = await getDocFromServer(ref);
  return role.exists() && role.data().active === true;
}
