import {NextResponse, type NextRequest} from 'next/server';
export function proxy(req:NextRequest){const res=NextResponse.next();const ref=req.nextUrl.searchParams.get('ref');if(ref&&/^[a-zA-Z0-9_-]{4,32}$/.test(ref)&&!req.cookies.has('rddly_ref'))res.cookies.set('rddly_ref',ref,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:30*86400,path:'/'});return res;}
export const config={matcher:['/','/register']};
