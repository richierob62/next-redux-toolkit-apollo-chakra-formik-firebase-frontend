import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from './auth-secrets';

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      databaseURL:
        'https://nextjs-firebase-auth-ec05a-default-rtdb.firebaseio.com',
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((e) => {
      throw e;
    });
};
