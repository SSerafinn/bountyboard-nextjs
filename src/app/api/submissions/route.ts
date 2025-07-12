import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bountyId = searchParams.get('bountyId');
    const status = searchParams.get('status');

    let where: any = {};

    if (bountyId) {
      where.bountyId = bountyId;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const submissions = await prisma.submission.findMany({
      where,
      include: {
        bounty: {
          select: {
            id: true,
            title: true,
            reward: true,
            rewardCurrency: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bountyId, content } = body;

    // TODO: Get user ID from authentication
    const userId = 'demo-user-id';

    const submission = await prisma.submission.create({
      data: {
        content,
        bountyId,
        userId,
      },
      include: {
        bounty: {
          select: {
            id: true,
            title: true,
            reward: true,
            rewardCurrency: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
} 