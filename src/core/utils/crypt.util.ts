import * as crypto from 'crypto';
import { compare, genSaltSync, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import DateMoment from 'moment';
import { createHash } from 'crypto';
import { UnauthorizedException } from '@nestjs/common';

/**
 * It returns the md5 hash of the given string
 * @param str string to be hashed
 * @returns hashed string
 */
export const md5 = (str: string) => {
  return crypto.createHash('md5').update(str).digest('hex');
};

export interface JwtPayload {
  uid: string;
}

export interface Sha512Interface {
  salt: string;
  passwordHash: string;
}

export const jwtSign = (
  data: object,
  jwtSalt = 'secreat',
  expiresIn: '1d' | '20h' | '60d' = '1d',
) => {
  return jwt.sign(data, jwtSalt, {
    algorithm: 'HS256',
    expiresIn: expiresIn, // unix seconds
  });
};

export const jwtVerify = (token: string, jwtSalt = 'secreat'): JwtPayload => {
  return jwt.verify(token, jwtSalt, {
    algorithms: ['HS256'],
  });
};

export const randomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function getMsTimeFromDays(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

export function trimAndLowerCase(value = '') {
  return `${String(value)}`.trim().toLowerCase();
}

export function getDomainFromEmail(email: string) {
  return String(email)
    .substring(email.lastIndexOf('@') + 1)
    .trim()
    .toLowerCase();
}

/**
 * compares plain password and password hash, and validates if both are same or not
 * it not same, throws an error, else resolves  true
 * @param plainPassword plain password received in requets body
 * @param passwordhash
 */
export async function comparePassword(
  plainPassword: string,
  passwordhash: string,
) {
  const isMatched = await compare(plainPassword, passwordhash);
  return isMatched;
}

/**
 * returns hash of password
 * @param plainPassword - plain password
 * @param salt - salt
 */
export async function makeHash(
  plainPassword: string,
  salt: string,
): Promise<string | null> {
  return await hash(plainPassword, salt);
}

/**
 * generates salt of password
 * @param round - number of rounds (defaults to 10)
 */
export async function generateSalt(round = 10) {
  return genSaltSync(round);
}

/**
 * returns generated salt and hash of user's plain password0
 * @param userPassword - user's password
 */
export async function generateSaltAndHash(
  userPassword: string,
): Promise<Sha512Interface> {
  const salt = await generateSalt();
  /** Gives us salt of length 16 */
  const passwordHash: string = (await makeHash(userPassword, salt)) as string;
  return {
    salt,
    passwordHash,
  };
}

export const addMonths = (months: number, date: Date) => {
  return DateMoment(date).add(months, 'M').toDate();
};

export const validateJwt = (token: string, requ: any) => {
  try {
    const data = assertJwt(token);
    requ['user'] = data;
    return true;
  } catch (e) {
    return false;
  }
};

export const assertJwt = (token?: string) => {
  try {
    if (!token)
      throw new UnauthorizedException(
        'Authorization is required for user validation.',
      );
    if (token.includes('Bearer') === false) {
      throw new Error('Authorization should be "Bearer".');
    }
    const splitBearer = token.split(' ')[1];
    const jwt = jwtVerify(String(splitBearer)) as JwtPayload | undefined;
    return jwt;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      throw new Error('Token could not be parsed.');
    }
    throw e;
  }
};

export function generateSHA1(input: string) {
  const shaSum = createHash('sha1');
  shaSum.update(`${new Date().getTime()}.${input}`);
  return shaSum.digest('hex');
}
