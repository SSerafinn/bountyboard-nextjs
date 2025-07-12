'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  walletAddress?: string;
  earnings: number;
  level: number;
  experience: number;
  experienceToNext: number;
  badges: string[];
  stats: {
    completedBounties: number;
    totalSubmissions: number;
    pendingSubmissions: number;
    averageRating: number;
  };
  projects: {
    id: string;
    title: string;
    status: 'completed' | 'pending' | 'ongoing';
    reward: number;
    category: string;
    completedAt?: string;
  }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Mock data for user profile
      const mockProfile: UserProfile = {
        id: '1',
        username: 'CryptoQueen',
        email: 'cryptoqueen@example.com',
        avatar: '/avatars/queen.jpg',
        walletAddress: '0x1234...5678',
        earnings: 2500,
        level: 8,
        experience: 7500,
        experienceToNext: 1000,
        badges: [
          'Speed Demon',
          'Quality Master', 
          'Community Hero',
          'Consistency King',
          'Early Bird'
        ],
        stats: {
          completedBounties: 15,
          totalSubmissions: 23,
          pendingSubmissions: 2,
          averageRating: 4.8
        },
        projects: [
          {
            id: '1',
            title: 'DeFi Dashboard UI',
            status: 'completed',
            reward: 500,
            category: 'frontend',
            completedAt: '2024-01-15'
          },
          {
            id: '2',
            title: 'Smart Contract Audit',
            status: 'completed',
            reward: 800,
            category: 'smart-contracts',
            completedAt: '2024-01-10'
          },
          {
            id: '3',
            title: 'Mobile App Design',
            status: 'pending',
            reward: 300,
            category: 'design'
          },
          {
            id: '4',
            title: 'API Integration',
            status: 'ongoing',
            reward: 400,
            category: 'backend'
          }
        ]
      };
      
      setProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Speed Demon': '#FF6B6B',
      'Quality Master': '#4ECDC4',
      'Community Hero': '#45B7D1',
      'Consistency King': '#96CEB4',
      'Early Bird': '#FFEAA7'
    };
    return colors[badge] || '#6C757D';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'completed': '#28a745',
      'pending': '#ffc107',
      'ongoing': '#17a2b8'
    };
    return colors[status] || '#6C757D';
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <p>Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <Link href="/" className="back-button">
          ← Back to Bounties
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-info"
        >
          <div className="profile-avatar">
            <img src={profile.avatar || '/default-avatar.png'} alt={profile.username} />
            <div className="level-badge">Lv.{profile.level}</div>
          </div>
          
          <div className="profile-details">
            <h1 className="username">{profile.username}</h1>
            <p className="email">{profile.email}</p>
            {profile.walletAddress && (
              <p className="wallet">Wallet: {profile.walletAddress}</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="profile-stats"
        >
          <div className="stat-card">
            <h3>${profile.earnings.toLocaleString()}</h3>
            <p>Total Earnings</p>
          </div>
          <div className="stat-card">
            <h3>{profile.stats.completedBounties}</h3>
            <p>Completed</p>
          </div>
          <div className="stat-card">
            <h3>{profile.stats.totalSubmissions}</h3>
            <p>Submissions</p>
          </div>
          <div className="stat-card">
            <h3>{profile.stats.averageRating.toFixed(1)}</h3>
            <p>Rating</p>
          </div>
        </motion.div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`tab ${activeTab === 'badges' ? 'active' : ''}`}
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overview-tab"
            >
              <div className="experience-section">
                <h3>Experience Progress</h3>
                <div className="experience-bar">
                  <div 
                    className="experience-fill"
                    style={{ 
                      width: `${(profile.experience / (profile.experience + profile.experienceToNext)) * 100}%` 
                    }}
                  ></div>
                </div>
                <p>{profile.experience} / {profile.experience + profile.experienceToNext} XP</p>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">✅</div>
                    <div className="activity-content">
                      <p>Completed "DeFi Dashboard UI" bounty</p>
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">🏆</div>
                    <div className="activity-content">
                      <p>Earned "Quality Master" badge</p>
                      <span>1 week ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">👍</div>
                    <div className="activity-content">
                      <p>Submission approved for "Smart Contract Audit"</p>
                      <span>1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="projects-tab"
            >
              <div className="projects-grid">
                {profile.projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h4>{project.title}</h4>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(project.status) }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="project-details">
                      <p className="category">{project.category}</p>
                      <p className="reward">${project.reward}</p>
                      {project.completedAt && (
                        <p className="completed-date">Completed: {project.completedAt}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'badges' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="badges-tab"
            >
              <div className="badges-grid">
                {profile.badges.map((badge, index) => (
                  <div key={index} className="badge-card">
                    <div 
                      className="badge-icon"
                      style={{ backgroundColor: getBadgeColor(badge) }}
                    >
                      🏆
                    </div>
                    <h4>{badge}</h4>
                    <p>Earned for exceptional performance</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 