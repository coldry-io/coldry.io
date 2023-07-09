import { NextRequest, NextResponse } from 'next/server';

import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser)
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const body = await request.json();
    const { integrations } = body;

    if (!integrations || !integrations.length)
      return new NextResponse(JSON.stringify({ message: 'No integrations provided' }), {
        status: 400
      });

    await prisma.user.update({
      where: { id: currentUser.user.id },
      data: {
        integrations: {
          connect: integrations.map((integration: string) => ({ id: integration }))
        },
        onboardedAt: new Date(Date.now())
      }
    });

    return new NextResponse(
      JSON.stringify({
        message: `${integrations.length} integrations successfully added to your account`
      }),
      {
        status: 201
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 500
      });

    return new NextResponse(
      JSON.stringify({ message: 'An error occured. Please try again later.' }),
      {
        status: 500
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser)
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const body = await request.json();
    const { integrations, remove } = body;

    if (!integrations || !integrations.length)
      return new NextResponse(JSON.stringify({ message: 'No integrations provided' }), {
        status: 400
      });

    await prisma.user.update({
      where: { id: currentUser.user.id },
      data: {
        integrations: {
          connect: integrations.map((integration: string) => ({ id: integration })),
          disconnect: remove.map((integration: string) => ({ id: integration }))
        }
      }
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Integrations successfully updated'
      }),
      {
        status: 200
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 500
      });

    return new NextResponse(
      JSON.stringify({ message: 'An error occured. Please try again later.' }),
      {
        status: 500
      }
    );
  }
}

export async function GET() {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser)
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const [userIntegrations, integrations] = await prisma.$transaction([
      prisma.integrations.findMany({
        where: {
          userId: currentUser.user.id
        },
        select: {
          id: true,
          name: true,
          image: true
        }
      }),
      prisma.integrations.findMany({
        select: {
          id: true,
          name: true,
          image: true
        }
      })
    ]);

    return new NextResponse(JSON.stringify({ userIntegrations, integrations }), { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 500
      });

    return new NextResponse(
      JSON.stringify({ message: 'An error occured. Please try again later.' }),
      {
        status: 500
      }
    );
  }
}
