import { headers } from 'next/headers';

export async function getUserIP() {

  const headerStore = await headers();
  
  const ip = headerStore.get('x-forwarded-for') || 
             headerStore.get('x-real-ip') || 
             '127.0.0.1';

  const clientIp = ip.split(',')[0].trim();
 
  return clientIp;
}