'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import CreateBountyModal from '@/components/CreateBountyModal';
import AuthModal from '@/components/AuthModal';
import BountyDetailsModal from '@/components/BountyDetailsModal';
import UserProfileModal from '@/components/UserProfileModal';
import LeaderboardModal from '@/components/LeaderboardModal';

interface Bounty {
  id: number;
  title: string;
  description: string;
  reward: number;
  category: string;
  project: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  status: string;
  creator?: {
    id: string;
    username: string;
    avatar?: string;
  };
  submissions?: any[];
}

interface UserStats {
  totalEarnings: number;
  completedTasks: number;
  activeBounties: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export default function Home() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalEarnings: 650,
    completedTasks: 2,
    activeBounties: 2,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBountyDetailsOpen, setIsBountyDetailsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchData();
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bountiesData, statsData] = await Promise.all([
        apiService.getBounties(),
        apiService.getUserStats(),
      ]);
      setBounties(bountiesData);
      setUserStats(statsData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBountyCreated = () => {
    fetchData(); // Refresh data after creating a bounty
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
  };

  const handleBountyClick = (bounty: Bounty) => {
    setSelectedBounty(bounty);
    setIsBountyDetailsOpen(true);
  };

  const handleUserProfileClick = () => {
    setIsUserProfileOpen(true);
    setShowUserMenu(false);
  };

  const handleLeaderboardClick = () => {
    setIsLeaderboardOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      design: '🎨',
      video: '🎬',
      content: '📝',
      development: '🔧',
      social: '🌟',
      educational: '📖',
    };
    return icons[category] || '📋';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      design: '#9B59B6',
      video: '#E67E22',
      content: '#27AE60',
      development: '#E74C3C',
      social: '#3498DB',
      educational: '#F39C12',
    };
    return colors[category] || '#95A5A6';
  };

  const filteredBounties = bounties.filter(bounty => {
    const matchesSearch = bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bounty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bounty.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || bounty.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <div className="logo">BountyBoard</div>
        <nav className="nav-links">
          <a href="#bounties">Bounties</a>
          <a href="#leaderboard" onClick={handleLeaderboardClick}>Leaderboard</a>
          <a href="#profile">Profile</a>
        </nav>
        <div className="header-user">
          {user ? (
            <div className="user-menu">
              <div 
                className="user-profile"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.username.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.username}</span>
                  <span className="user-status">Online</span>
                </div>
              </div>
              {showUserMenu && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-item" onClick={handleUserProfileClick}>
                    <span className="user-menu-icon">👤</span>
                    Profile
                  </div>
                  <div className="user-menu-item">
                    <span className="user-menu-icon">⚙️</span>
                    Settings
                  </div>
                  <div className="user-menu-item" onClick={handleLogout}>
                    <span className="user-menu-icon">🚪</span>
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="connect-wallet"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <div className="container">
        <div className="main-content">
          <div className="bounty-section">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Bounties
              </button>
              <button 
                className={`tab ${activeTab === 'my' ? 'active' : ''}`}
                onClick={() => setActiveTab('my')}
              >
                My Bounties
              </button>
              <button 
                className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>

            <input
              type="text"
              className="search-bar"
              placeholder="Search bounties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'design' ? 'active' : ''}`}
                onClick={() => setActiveFilter('design')}
              >
                Design
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'video' ? 'active' : ''}`}
                onClick={() => setActiveFilter('video')}
              >
                Video
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'content' ? 'active' : ''}`}
                onClick={() => setActiveFilter('content')}
              >
                Content
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'development' ? 'active' : ''}`}
                onClick={() => setActiveFilter('development')}
              >
                Development
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'social' ? 'active' : ''}`}
                onClick={() => setActiveFilter('social')}
              >
                Social
              </button>
            </div>

            <div className="bounty-list">
              {filteredBounties.map((bounty) => (
                <div 
                  key={bounty.id} 
                  className="bounty-card"
                  onClick={() => handleBountyClick(bounty)}
                >
                  <div className="bounty-reward">{bounty.reward} APT</div>
                  <div className="bounty-header">
                    <div 
                      className="bounty-icon"
                      style={{ backgroundColor: getCategoryColor(bounty.category) }}
                    >
                      {getCategoryIcon(bounty.category)}
                    </div>
                    <div>
                      <div className="bounty-title">{bounty.title}</div>
                      <div className="bounty-meta">
                        <span>{bounty.project}</span>
                        <span>•</span>
                        <span>{bounty.category}</span>
                        {bounty.dueDate && (
                          <>
                            <span>•</span>
                            <span>Due: {new Date(bounty.dueDate).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <p>{bounty.description}</p>
                  <div className="bounty-tags">
                    {bounty.tags.map((tag, index) => (
                      <span key={index} className={`tag ${bounty.category}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Your Stats</h3>
              <div className="stats-container">
                <div className="stat-card earnings">
                  <div className="stat-icon">💰</div>
                  <div className="stat-number">{userStats.totalEarnings}</div>
                  <div className="stat-label">Total Earnings</div>
                </div>
                <div className="stat-card tasks">
                  <div className="stat-icon">✅</div>
                  <div className="stat-number">{userStats.completedTasks}</div>
                  <div className="stat-label">Completed Tasks</div>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min((userStats.completedTasks / 10) * 100, 100)}%` }}
                ></div>
              </div>
              {user && (
                <div className="level-info">
                  <span className="level-text">Level {Math.floor(userStats.totalEarnings / 100) + 1} Bounty Hunter</span>
                </div>
              )}
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Recent Activity</h3>
              <div className="recent-list">
                <div className="recent-item">
                  <div className="recent-icon">🎨</div>
                  <div className="recent-details">
                    <div className="recent-title">Logo Design</div>
                    <div className="recent-subtitle">Completed 2 hours ago</div>
                  </div>
                  <div className="recent-reward">+50 APT</div>
                </div>
                <div className="recent-item">
                  <div className="recent-icon">📝</div>
                  <div className="recent-details">
                    <div className="recent-title">Blog Post</div>
                    <div className="recent-subtitle">Completed 1 day ago</div>
                  </div>
                  <div className="recent-reward">+25 APT</div>
                </div>
                <div className="recent-item">
                  <div className="recent-icon">🎬</div>
                  <div className="recent-details">
                    <div className="recent-title">Video Tutorial</div>
                    <div className="recent-subtitle">Completed 3 days ago</div>
                  </div>
                  <div className="recent-reward">+100 APT</div>
                </div>
              </div>
            </div>

            {user && (
              <div className="sidebar-section">
                <h3 className="sidebar-title">Quick Actions</h3>
                <div className="quick-actions">
                  <button 
                    className="quick-action-btn"
                    onClick={handleUserProfileClick}
                  >
                    <span className="action-icon">👤</span>
                    View Profile
                  </button>
                  <button 
                    className="quick-action-btn"
                    onClick={handleLeaderboardClick}
                  >
                    <span className="action-icon">🏆</span>
                    Leaderboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && (
        <button 
          className="floating-action"
          onClick={() => setIsModalOpen(true)}
          title="Create New Bounty"
        >
          +
        </button>
      )}

      <CreateBountyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBountyCreated={handleBountyCreated}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <BountyDetailsModal
        isOpen={isBountyDetailsOpen}
        onClose={() => {
          setIsBountyDetailsOpen(false);
          setSelectedBounty(null);
        }}
        bounty={selectedBounty}
        user={user}
      />

      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        user={user}
        userStats={userStats}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </>
  );
}
