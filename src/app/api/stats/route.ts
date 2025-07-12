import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get user ID from authentication
    const userId = 'demo-user-id';

    // Get user's total earnings
    const earnings = await prisma.user.findUnique({
      where: { id: userId },
      select: { earnings: true },
    });

    // Get user's created bounties count
    const tasksCount = await prisma.bounty.count({
      where: { creatorId: userId },
    });

    // Get recent submissions
    const recentSubmissions = await prisma.submission.findMany({
      where: { userId },
      include: {
        bounty: {
          select: {
            id: true,
            title: true,
            reward: true,
            rewardCurrency: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Get recent bounties
    const recentBounties = await prisma.bounty.findMany({
      where: { creatorId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const stats = {
      earnings: earnings?.earnings || 0,
      tasksCount,
      recentSubmissions,
      recentBounties,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 