export interface HashProvider {
  generateHash(payload: string): Promise<string>
  compareHash(payload: string, hashedPayload: string): Promise<boolean>
}
