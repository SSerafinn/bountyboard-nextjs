'use client';

import { useState } from 'react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockLeaderboardData = [
  {
    id: 1,
    username: 'CryptoQueen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoQueen',
    totalEarnings: 2500,
    completedTasks: 15,
    level: 25,
    rank: 1,
    badges: ['Legend', 'Millionaire', 'Speed Demon'],
    recentActivity: 'Completed "DeFi Dashboard Design" +300 APT',
    status: 'online',
  },
  {
    id: 2,
    username: 'DesignMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesignMaster',
    totalEarnings: 1800,
    completedTasks: 12,
    level: 18,
    rank: 2,
    badges: ['Quality Master', 'First Blood'],
    recentActivity: 'Completed "Logo Design" +150 APT',
    status: 'online',
  },
  {
    id: 3,
    username: 'WebWizard',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WebWizard',
    totalEarnings: 1200,
    completedTasks: 8,
    level: 12,
    rank: 3,
    badges: ['Speed Demon'],
    recentActivity: 'Completed "Landing Page" +200 APT',
    status: 'offline',
  },
  {
    id: 4,
    username: 'ContentCreator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ContentCreator',
    totalEarnings: 950,
    completedTasks: 6,
    level: 9,
    rank: 4,
    badges: ['First Blood'],
    recentActivity: 'Completed "Blog Series" +100 APT',
    status: 'online',
  },
  {
    id: 5,
    username: 'VideoVirtuoso',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VideoVirtuoso',
    totalEarnings: 800,
    completedTasks: 5,
    level: 8,
    rank: 5,
    badges: ['First Blood'],
    recentActivity: 'Completed "Tutorial Video" +150 APT',
    status: 'offline',
  },
  {
    id: 6,
    username: 'SocialStar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SocialStar',
    totalEarnings: 650,
    completedTasks: 4,
    level: 6,
    rank: 6,
    badges: ['First Blood'],
    recentActivity: 'Completed "Social Campaign" +200 APT',
    status: 'online',
  },
  {
    id: 7,
    username: 'DevDynamo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevDynamo',
    totalEarnings: 500,
    completedTasks: 3,
    level: 5,
    rank: 7,
    badges: ['First Blood'],
    recentActivity: 'Completed "Smart Contract" +300 APT',
    status: 'offline',
  },
  {
    id: 8,
    username: 'ArtAce',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArtAce',
    totalEarnings: 400,
    completedTasks: 2,
    level: 4,
    rank: 8,
    badges: ['First Blood'],
    recentActivity: 'Completed "NFT Collection" +200 APT',
    status: 'online',
  },
  {
    id: 9,
    username: 'MarketingMaven',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarketingMaven',
    totalEarnings: 300,
    completedTasks: 2,
    level: 3,
    rank: 9,
    badges: ['First Blood'],
    recentActivity: 'Completed "Marketing Strategy" +150 APT',
    status: 'offline',
  },
  {
    id: 10,
    username: 'NewbieNinja',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NewbieNinja',
    totalEarnings: 200,
    completedTasks: 1,
    level: 2,
    rank: 10,
    badges: ['First Blood'],
    recentActivity: 'Completed "First Task" +100 APT',
    status: 'online',
  },
];

const leaderboardCategories = [
  { id: 'earnings', label: 'Top Earners', icon: '💰' },
  { id: 'tasks', label: 'Most Active', icon: '⚡' },
  { id: 'level', label: 'Highest Level', icon: '🏆' },
  { id: 'recent', label: 'Recent Stars', icon: '⭐' },
];

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const [activeCategory, setActiveCategory] = useState('earnings');
  const [timeFilter, setTimeFilter] = useState('all');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#2C3E50';
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? '#27AE60' : '#95A5A6';
  };

  const sortedData = [...mockLeaderboardData].sort((a, b) => {
    switch (activeCategory) {
      case 'earnings':
        return b.totalEarnings - a.totalEarnings;
      case 'tasks':
        return b.completedTasks - a.completedTasks;
      case 'level':
        return b.level - a.level;
      case 'recent':
        return b.id - a.id; // Simulate recent activity
      default:
        return b.totalEarnings - a.totalEarnings;
    }
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content leaderboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Leaderboard</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="leaderboard-content">
          {/* Category Tabs */}
          <div className="leaderboard-tabs">
            {leaderboardCategories.map((category) => (
              <button
                key={category.id}
                className={`leaderboard-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-label">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Time Filter */}
          <div className="time-filter">
            <button
              className={`time-filter-btn ${timeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTimeFilter('all')}
            >
              All Time
            </button>
            <button
              className={`time-filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
              onClick={() => setTimeFilter('month')}
            >
              This Month
            </button>
            <button
              className={`time-filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
              onClick={() => setTimeFilter('week')}
            >
              This Week
            </button>
          </div>

          {/* Leaderboard List */}
          <div className="leaderboard-list">
            {sortedData.map((user, index) => (
              <div key={user.id} className="leaderboard-item">
                <div className="rank-section">
                  <div 
                    className="rank-badge"
                    style={{ color: getRankColor(user.rank) }}
                  >
                    {getRankIcon(user.rank)}
                  </div>
                </div>

                <div className="user-section">
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.username.charAt(0)}
                      </div>
                    )}
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    ></div>
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-level">Level {user.level}</div>
                    <div className="user-badges">
                      {user.badges.slice(0, 2).map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="badge-tag">
                          {badge}
                        </span>
                      ))}
                      {user.badges.length > 2 && (
                        <span className="badge-more">+{user.badges.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="stats-section">
                  <div className="stat-item">
                    <span className="stat-label">Earnings</span>
                    <span className="stat-value">{user.totalEarnings} APT</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Tasks</span>
                    <span className="stat-value">{user.completedTasks}</span>
                  </div>
                </div>

                <div className="activity-section">
                  <div className="recent-activity">
                    {user.recentActivity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top 3 Highlight */}
          <div className="top-three-highlight">
            <h4 className="highlight-title">🏆 Top Performers</h4>
            <div className="top-three-grid">
              {sortedData.slice(0, 3).map((user, index) => (
                <div key={user.id} className={`top-three-item rank-${index + 1}`}>
                  <div className="top-rank-badge">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="top-user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} />
                    ) : (
                      <div className="avatar-placeholder large">
                        {user.username.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="top-user-info">
                    <div className="top-user-name">{user.username}</div>
                    <div className="top-user-earnings">{user.totalEarnings} APT</div>
                    <div className="top-user-level">Level {user.level}</div>
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