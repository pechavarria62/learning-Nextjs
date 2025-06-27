import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && user.password === password) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }
}
