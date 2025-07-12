'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LeaderboardUser {
  id: string;
  username: string;
  avatar?: string;
  earnings: number;
  completedBounties: number;
  totalSubmissions: number;
  level: number;
  badges: string[];
}

interface LeaderboardData {
  users: LeaderboardUser[];
  recentActivity: {
    id: string;
    type: 'bounty_completed' | 'submission_approved' | 'new_badge';
    user: string;
    description: string;
    timestamp: string;
  }[];
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      // Mock data for leaderboard
      const mockData: LeaderboardData = {
        users: [
          {
            id: '1',
            username: 'CryptoQueen',
            avatar: '/avatars/queen.jpg',
            earnings: 2500,
            completedBounties: 15,
            totalSubmissions: 23,
            level: 8,
            badges: ['Speed Demon', 'Quality Master', 'Community Hero']
          },
          {
            id: '2',
            username: 'BlockchainBob',
            avatar: '/avatars/bob.jpg',
            earnings: 1800,
            completedBounties: 12,
            totalSubmissions: 18,
            level: 6,
            badges: ['Consistency King', 'Early Bird']
          },
          {
            id: '3',
            username: 'DeFiDev',
            avatar: '/avatars/dev.jpg',
            earnings: 1200,
            completedBounties: 8,
            totalSubmissions: 12,
            level: 4,
            badges: ['Rising Star']
          },
          {
            id: '4',
            username: 'SmartContractSam',
            avatar: '/avatars/sam.jpg',
            earnings: 900,
            completedBounties: 6,
            totalSubmissions: 9,
            level: 3,
            badges: ['Newcomer']
          },
          {
            id: '5',
            username: 'Web3Wizard',
            avatar: '/avatars/wizard.jpg',
            earnings: 600,
            completedBounties: 4,
            totalSubmissions: 6,
            level: 2,
            badges: ['Newcomer']
          }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'bounty_completed',
            user: 'CryptoQueen',
            description: 'Completed "DeFi Dashboard UI" bounty',
            timestamp: '2 hours ago'
          },
          {
            id: '2',
            type: 'submission_approved',
            user: 'BlockchainBob',
            description: 'Submission approved for "Smart Contract Audit"',
            timestamp: '4 hours ago'
          },
          {
            id: '3',
            type: 'new_badge',
            user: 'DeFiDev',
            description: 'Earned "Quality Master" badge',
            timestamp: '6 hours ago'
          }
        ]
      };
      
      setLeaderboardData(mockData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryUsers = () => {
    if (!leaderboardData) return [];
    
    let filteredUsers = [...leaderboardData.users];
    
    if (selectedCategory !== 'all') {
      // TODO: Filter by category when backend supports it
    }
    
    return filteredUsers.sort((a, b) => b.earnings - a.earnings);
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Speed Demon': '#FF6B6B',
      'Quality Master': '#4ECDC4',
      'Community Hero': '#45B7D1',
      'Consistency King': '#96CEB4',
      'Early Bird': '#FFEAA7',
      'Rising Star': '#DDA0DD',
      'Newcomer': '#98D8C8'
    };
    return colors[badge] || '#6C757D';
  };

  if (loading) {
    return (
      <div className="leaderboard-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <Link href="/" className="back-button">
          ← Back to Bounties
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="leaderboard-title"
        >
          🏆 Leaderboard
        </motion.h1>
        <p className="leaderboard-subtitle">Top performers in the bounty community</p>
      </div>

      <div className="leaderboard-controls">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="smart-contracts">Smart Contracts</option>
            <option value="design">Design</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Timeframe:</label>
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="leaderboard-content">
        <div className="leaderboard-main">
          <div className="leaderboard-list">
            {getCategoryUsers().map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}
              >
                <div className="rank-badge">
                  {index + 1}
                </div>
                
                <div className="user-info">
                  <div className="user-avatar">
                    <img src={user.avatar || '/default-avatar.png'} alt={user.username} />
                    <div className="level-badge">Lv.{user.level}</div>
                  </div>
                  
                  <div className="user-details">
                    <h3 className="username">{user.username}</h3>
                    <div className="user-stats">
                      <span>${user.earnings.toLocaleString()}</span>
                      <span>•</span>
                      <span>{user.completedBounties} completed</span>
                      <span>•</span>
                      <span>{user.totalSubmissions} submissions</span>
                    </div>
                  </div>
                </div>

                <div className="user-badges">
                  {user.badges.slice(0, 3).map((badge, badgeIndex) => (
                    <div
                      key={badgeIndex}
                      className="badge"
                      style={{ backgroundColor: getBadgeColor(badge) }}
                      title={badge}
                    >
                      {badge}
                    </div>
                  ))}
                  {user.badges.length > 3 && (
                    <div className="badge more-badges">
                      +{user.badges.length - 3}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="leaderboard-sidebar">
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {leaderboardData?.recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'bounty_completed' && '✅'}
                    {activity.type === 'submission_approved' && '👍'}
                    {activity.type === 'new_badge' && '🏆'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-user">{activity.user}</p>
                    <p className="activity-description">{activity.description}</p>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 