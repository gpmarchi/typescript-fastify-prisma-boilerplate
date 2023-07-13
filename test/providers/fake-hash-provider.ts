import { HashProvider } from '@/shared/providers/hash-provider'

export class FakeHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload
  }

  async compareHash(payload: string, hashedPayload: string): Promise<boolean> {
    return payload === hashedPayload
  }
}
