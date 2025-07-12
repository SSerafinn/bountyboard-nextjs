'use client';

import { useState } from 'react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  userStats: any;
}

const mockBadges = [
  { id: 1, name: 'First Blood', icon: '🩸', description: 'Completed your first bounty', earned: true },
  { id: 2, name: 'Speed Demon', icon: '⚡', description: 'Completed 5 bounties in a week', earned: true },
  { id: 3, name: 'Quality Master', icon: '🏆', description: 'Received 10 approved submissions', earned: true },
  { id: 4, name: 'Social Butterfly', icon: '🦋', description: 'Created 20 bounties', earned: false },
  { id: 5, name: 'Millionaire', icon: '💰', description: 'Earned 1000+ APT', earned: false },
  { id: 6, name: 'Legend', icon: '👑', description: 'Top 1% of all users', earned: false },
];

const mockProjects = [
  {
    id: 1,
    title: 'Logo Design for Crypto Startup',
    category: 'design',
    reward: 150,
    status: 'completed',
    completedAt: '2024-01-15',
    rating: 5,
    feedback: 'Excellent work! The logo perfectly captures our brand identity.',
  },
  {
    id: 2,
    title: 'Website Landing Page',
    category: 'development',
    reward: 300,
    status: 'ongoing',
    startedAt: '2024-01-20',
    progress: 75,
    dueDate: '2024-02-15',
  },
  {
    id: 3,
    title: 'Social Media Campaign',
    category: 'social',
    reward: 200,
    status: 'pending',
    submittedAt: '2024-01-18',
    reviewStatus: 'under_review',
  },
  {
    id: 4,
    title: 'Video Tutorial Series',
    category: 'video',
    reward: 500,
    status: 'completed',
    completedAt: '2024-01-10',
    rating: 4,
    feedback: 'Great tutorial series! Very helpful and well-produced.',
  },
  {
    id: 5,
    title: 'Blog Content Creation',
    category: 'content',
    reward: 100,
    status: 'ongoing',
    startedAt: '2024-01-25',
    progress: 30,
    dueDate: '2024-02-10',
  },
];

export default function UserProfileModal({ isOpen, onClose, user, userStats }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

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

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      completed: '#27AE60',
      ongoing: '#3498DB',
      pending: '#F39C12',
    };
    return colors[status] || '#95A5A6';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const completedProjects = mockProjects.filter(p => p.status === 'completed');
  const ongoingProjects = mockProjects.filter(p => p.status === 'ongoing');
  const pendingProjects = mockProjects.filter(p => p.status === 'pending');

  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content user-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">User Profile</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="user-profile-content">
          {/* User Header */}
          <div className="user-profile-header">
            <div className="user-profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                <div className="avatar-placeholder large">
                  {user.username.charAt(0)}
                </div>
              )}
            </div>
            <div className="user-profile-info">
              <h3 className="user-profile-name">{user.username}</h3>
              <div className="user-profile-stats">
                <span className="stat-item">
                  <span className="stat-number">{completedProjects.length}</span>
                  <span className="stat-label">Completed</span>
                </span>
                <span className="stat-item">
                  <span className="stat-number">{ongoingProjects.length}</span>
                  <span className="stat-label">Ongoing</span>
                </span>
                <span className="stat-item">
                  <span className="stat-number">{userStats.totalEarnings}</span>
                  <span className="stat-label">APT Earned</span>
                </span>
              </div>
            </div>
            <div className="user-profile-level">
              <div className="level-badge">
                <span className="level-number">Level {Math.floor(userStats.totalEarnings / 100) + 1}</span>
                <span className="level-label">Bounty Hunter</span>
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`profile-tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button 
              className={`profile-tab ${activeTab === 'badges' ? 'active' : ''}`}
              onClick={() => setActiveTab('badges')}
            >
              Badges
            </button>
          </div>

          {/* Tab Content */}
          <div className="profile-tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">{userStats.totalEarnings} APT</div>
                    <div className="stat-title">Total Earnings</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">{completedProjects.length}</div>
                    <div className="stat-title">Completed</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-value">{ongoingProjects.length}</div>
                    <div className="stat-title">In Progress</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-value">4.8</div>
                    <div className="stat-title">Avg Rating</div>
                  </div>
                </div>

                <div className="recent-activity">
                  <h4 className="section-title">Recent Activity</h4>
                  <div className="activity-list">
                    {mockProjects.slice(0, 3).map((project) => (
                      <div key={project.id} className="activity-item">
                        <div className="activity-icon">
                          {getCategoryIcon(project.category)}
                        </div>
                        <div className="activity-details">
                          <div className="activity-title">{project.title}</div>
                          <div className="activity-meta">
                            {project.status === 'completed' && (
                              <span className="activity-status completed">Completed</span>
                            )}
                            {project.status === 'ongoing' && (
                              <span className="activity-status ongoing">In Progress</span>
                            )}
                            {project.status === 'pending' && (
                              <span className="activity-status pending">Under Review</span>
                            )}
                            <span className="activity-reward">+{project.reward} APT</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="projects-content">
                <div className="project-section">
                  <h4 className="section-title">Completed Projects ({completedProjects.length})</h4>
                  <div className="project-list">
                    {completedProjects.map((project) => (
                      <div key={project.id} className="project-card completed">
                        <div className="project-header">
                          <div 
                            className="project-icon"
                            style={{ backgroundColor: getCategoryColor(project.category) }}
                          >
                            {getCategoryIcon(project.category)}
                          </div>
                          <div className="project-info">
                            <div className="project-title">{project.title}</div>
                            <div className="project-meta">
                              <span className="project-category">{project.category}</span>
                              <span className="project-date">Completed {formatDate(project.completedAt)}</span>
                            </div>
                          </div>
                          <div className="project-reward">+{project.reward} APT</div>
                        </div>
                        {project.rating && (
                          <div className="project-rating">
                            <span className="stars">{'⭐'.repeat(project.rating)}</span>
                            <span className="rating-text">Rated {project.rating}/5</span>
                          </div>
                        )}
                        {project.feedback && (
                          <div className="project-feedback">
                            "{project.feedback}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-section">
                  <h4 className="section-title">Ongoing Projects ({ongoingProjects.length})</h4>
                  <div className="project-list">
                    {ongoingProjects.map((project) => (
                      <div key={project.id} className="project-card ongoing">
                        <div className="project-header">
                          <div 
                            className="project-icon"
                            style={{ backgroundColor: getCategoryColor(project.category) }}
                          >
                            {getCategoryIcon(project.category)}
                          </div>
                          <div className="project-info">
                            <div className="project-title">{project.title}</div>
                            <div className="project-meta">
                              <span className="project-category">{project.category}</span>
                              <span className="project-due">Due {formatDate(project.dueDate)}</span>
                            </div>
                          </div>
                          <div className="project-reward">+{project.reward} APT</div>
                        </div>
                        <div className="project-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{project.progress}% Complete</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-section">
                  <h4 className="section-title">Pending Review ({pendingProjects.length})</h4>
                  <div className="project-list">
                    {pendingProjects.map((project) => (
                      <div key={project.id} className="project-card pending">
                        <div className="project-header">
                          <div 
                            className="project-icon"
                            style={{ backgroundColor: getCategoryColor(project.category) }}
                          >
                            {getCategoryIcon(project.category)}
                          </div>
                          <div className="project-info">
                            <div className="project-title">{project.title}</div>
                            <div className="project-meta">
                              <span className="project-category">{project.category}</span>
                              <span className="project-submitted">Submitted {formatDate(project.submittedAt)}</span>
                            </div>
                          </div>
                          <div className="project-reward">+{project.reward} APT</div>
                        </div>
                        <div className="project-status">
                          <span className="status-badge pending">Under Review</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="badges-content">
                <div className="badges-grid">
                  {mockBadges.map((badge) => (
                    <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
                      <div className="badge-icon">{badge.icon}</div>
                      <div className="badge-info">
                        <div className="badge-name">{badge.name}</div>
                        <div className="badge-description">{badge.description}</div>
                      </div>
                      {badge.earned && (
                        <div className="badge-status earned">✓ Earned</div>
                      )}
                      {!badge.earned && (
                        <div className="badge-status locked">🔒 Locked</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 