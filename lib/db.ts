import { Pool, PoolClient } from 'pg';
const g = globalThis as unknown as {rddlyPool?:Pool};
export function pool(){if(!process.env.DATABASE_URL) throw new Error('SETUP_REQUIRED'); return g.rddlyPool ??= new Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:10000});}
export async function sql(text:string,values:unknown[]=[]){return pool().query(text,values);}
export async function transaction<T>(fn:(client:PoolClient)=>Promise<T>){const c=await pool().connect(); try{await c.query('BEGIN');const out=await fn(c);await c.query('COMMIT');return out;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}
