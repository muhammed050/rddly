import type {Metadata,Viewport} from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'ردلي — مساحة المبيعات',template:'%s | ردلي'},description:'أتمتة محادثات إنستغرام وإدارة العملاء والمواعيد في مساحة عربية واحدة.',manifest:'/manifest.webmanifest',robots:{index:false,follow:false}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0d9488'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body>{children}</body></html>;}
