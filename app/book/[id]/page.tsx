import Booking from '@/components/booking';
export default async function Page({params}:{params:Promise<{id:string}>}){return <Booking id={(await params).id}/>;}
