
'use client';
import dynamic from 'next/dynamic';
export default dynamic(() => import('@/page-components/Splash'), { ssr: false });