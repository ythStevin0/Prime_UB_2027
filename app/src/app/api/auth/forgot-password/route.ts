import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/backend/lib/db';
import { passwordResetRequests, users } from '@/backend/lib/db/schema';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email address is required.' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'Email tidak terdaftar. Pastikan Anda sudah membuat akun.' },
        { status: 404 }
      );
    }

    // Insert into database
    await db.insert(passwordResetRequests).values({
      email,
      status: 'PENDING',
    });

    return NextResponse.json(
      { message: 'Password reset request submitted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting forgot password request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
