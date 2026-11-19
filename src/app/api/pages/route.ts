import { NextResponse } from 'next/server';
import { getPages } from '@/lib/data';

export async function GET() {
  const pages = getPages();
  return NextResponse.json(pages);
}
