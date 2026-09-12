import {notFound} from 'next/navigation';
import AuthForm from '@/components/auth-form';
export default async function Page({params}:{params:Promise<{auth:string}>}){const {auth}=await params;if(!['login','register','forgot','reset'].includes(auth))notFound();return <AuthForm mode={auth}/>;}
