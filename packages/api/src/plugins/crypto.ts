import * as bcrypt from 'bcrypt';

export default class Crypto {
  public static async hash(value: string): Promise<string> {
    return await new Promise((resolver, rejecter) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(value, salt, (err, hash) => {
          if (err) {
            rejecter(err);
          }

          resolver(hash);
        });
      });
    });
  }

  public static async compare(plain: string, hash: string) {
    return await new Promise((resolver, rejector) => {
      bcrypt.compare(plain, hash, (err, res) => {
        if (err) {
          return rejector(err);
        }

        resolver(res);
      });
    });
  }
}
