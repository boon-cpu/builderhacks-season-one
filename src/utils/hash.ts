import bcrypt from "bcrypt";

export const verifyHash = (pass: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

export const createHash = (pass: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pass, 10, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};
