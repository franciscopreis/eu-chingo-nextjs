import { createClient } from '@libsql/client'

const { TURSO_URL, TURSO_AUTH_TOKEN } = process.env

if (!TURSO_URL || !TURSO_AUTH_TOKEN) {
  throw new Error('⚠️ TURSO_URL e TURSO_AUTH_TOKEN são obrigatórios.')
}

console.log('🌐 Conectando à base de dados Turso:', TURSO_URL)

const client = createClient({ url: TURSO_URL, authToken: TURSO_AUTH_TOKEN })

const db = {
  async get<T = any>(sql: string, params?: any[]) {
    const res = await client.execute({ sql, args: params })
    return res.rows[0] as T
  },
  async all<T = any>(sql: string, params?: any[]) {
    const res = await client.execute({ sql, args: params })
    return res.rows as T[]
  },
  async run(sql: string, params?: any[]) {
    const res = await client.execute({ sql, args: params })
    return res
  },
}

export default db
