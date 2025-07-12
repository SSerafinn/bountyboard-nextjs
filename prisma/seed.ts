import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      username: 'demo_user',
      walletAddress: '0x1234567890123456789012345678901234567890',
      earnings: 19.0,
    },
  });

  // Create sample bounties
  const bounties = await Promise.all([
    prisma.bounty.create({
      data: {
        title: 'Aptos Finance - UI Design Review',
        description: 'Review and provide feedback on the new Aptos Finance UI design. Focus on user experience and accessibility.',
        reward: 100,
        rewardCurrency: 'APT',
        category: 'design',
        project: 'APTOS FINANCE',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        progress: 65,
        tags: ['Design', 'UI/UX'],
        creatorId: user.id,
      },
    }),
    prisma.bounty.create({
      data: {
        title: 'Create a video about Petra Wallet',
        description: 'Create an engaging video showcasing Petra Wallet features and benefits for the Aptos ecosystem.',
        reward: 200,
        rewardCurrency: 'APT',
        category: 'video',
        project: 'PETRA WALLET',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        progress: 40,
        tags: ['Video', 'Marketing'],
        creatorId: user.id,
      },
    }),
    prisma.bounty.create({
      data: {
        title: 'Write a thread about Hyperion on X',
        description: 'Create an informative Twitter thread about Hyperion protocol and its benefits for the Aptos ecosystem.',
        reward: 20,
        rewardCurrency: 'APT',
        category: 'content',
        project: 'HYPERION',
        dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
        progress: 85,
        tags: ['Content', 'Social'],
        creatorId: user.id,
      },
    }),
    prisma.bounty.create({
      data: {
        title: 'PACT gives Memecoin Traders superpowers',
        description: 'Develop smart contracts and tools for PACT protocol to enhance memecoin trading capabilities.',
        reward: 1,
        rewardCurrency: 'APT',
        category: 'development',
        project: 'PACT',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        progress: 25,
        tags: ['Development', 'DeFi'],
        creatorId: user.id,
      },
    }),
    prisma.bounty.create({
      data: {
        title: 'Threadstorming Thala: Tweet Like a Pro',
        description: 'Create viral Twitter content about Thala protocol and its innovative DeFi solutions.',
        reward: 250,
        rewardCurrency: 'APT',
        category: 'social',
        project: 'THALA',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        progress: 15,
        tags: ['Social', 'Community'],
        creatorId: user.id,
      },
    }),
    prisma.bounty.create({
      data: {
        title: 'Write a thread about Aptos Learn on X',
        description: 'Create educational content about Aptos Learn platform and its resources for developers.',
        reward: 15,
        rewardCurrency: 'APT',
        category: 'content',
        project: 'APTOS LEARN',
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        progress: 70,
        tags: ['Educational', 'Content'],
        creatorId: user.id,
      },
    }),
  ]);

  // Create sample submissions
  await Promise.all([
    prisma.submission.create({
      data: {
        content: 'I have completed the UI design review for Aptos Finance. Here are my findings and recommendations...',
        status: 'APPROVED',
        bountyId: bounties[0].id,
        userId: user.id,
      },
    }),
    prisma.submission.create({
      data: {
        content: 'Working on the Petra Wallet video. Here is my progress update...',
        status: 'PENDING',
        bountyId: bounties[1].id,
        userId: user.id,
      },
    }),
    prisma.submission.create({
      data: {
        content: 'Smart contract development for PACT protocol is in progress...',
        status: 'PENDING',
        bountyId: bounties[3].id,
        userId: user.id,
      },
    }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 