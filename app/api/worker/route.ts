import {drainJobs} from '@/lib/worker';
import {admin,sameOrigin} from '@/lib/auth';
export const runtime='nodejs';
export const maxDuration=60;
export async function GET(req:Request){if(!process.env.CRON_SECRET||req.headers.get('authorization')!==`Bearer ${process.env.CRON_SECRET}`)return Response.json({error:'Unauthorized'},{status:401});return Response.json(await drainJobs());}
export async function POST(req:Request){try{sameOrigin(req);await admin();return Response.json(await drainJobs());}catch{return Response.json({error:'Unauthorized'},{status:403});}}
