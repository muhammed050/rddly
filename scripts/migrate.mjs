import pg from 'pg';
import {readFile} from 'node:fs/promises';
if(!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL before migration');
const p=new pg.Pool({connectionString:process.env.DATABASE_URL});
try{await p.query(await readFile(new URL('../db/schema.sql',import.meta.url),'utf8'));console.log('Database schema installed.');}finally{await p.end();}
