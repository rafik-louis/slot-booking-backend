import * as bcrypt from 'bcryptjs';

/**
 * A service that handles hashing
 * Currently only used to hash passwords
 */
export class HashingService {
  public async hashPassword(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainTextPassword, salt);
  }

  async matchPassword(plainTextPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, password);
  }
}
