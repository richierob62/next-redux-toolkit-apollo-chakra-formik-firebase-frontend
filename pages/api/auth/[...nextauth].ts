import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const options = {
    site: process.env.NEXTAUTH_URL,
    theme: 'light',
    providers: [
      Providers.Email({
        server: {
          port: 465,
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.EMAIL_USERNAME as string,
            pass: process.env.EMAIL_PASSWORD as string,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    database: process.env.DATABASE_URL,
  };

  return NextAuth(req, res, options);
};
