'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BountyDetails {
  id: string;
  title: string;
  description: string;
  reward: number;
  rewardCurrency: string;
  category: string;
  status: string;
  dueDate?: string;
  progress: number;
  tags: string[];
  project: string;
  createdAt: string;
  creator: {
    id: string;
    username: string;
    avatar?: string;
  };
  submissions: {
    id: string;
    content: string;
    status: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
      avatar?: string;
    };
  }[];
}

export default function BountyDetailsPage() {
  const params = useParams();
  const bountyId = params.id as string;
  
  const [bounty, setBounty] = useState<BountyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionContent, setSubmissionContent] = useState('');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  useEffect(() => {
    if (bountyId) {
      fetchBountyDetails();
    }
  }, [bountyId]);

  const fetchBountyDetails = async () => {
    try {
      setLoading(true);
      // Mock data for bounty details
      const mockBounty: BountyDetails = {
        id: bountyId,
        title: 'DeFi Dashboard UI Development',
        description: `Create a comprehensive DeFi dashboard with real-time data visualization, portfolio tracking, and yield farming analytics. The dashboard should include:

Key Features:
• Real-time price feeds from multiple DEXs
• Portfolio tracking with P&L calculations
• Yield farming opportunities and APY comparisons
• Gas fee optimization recommendations
• Mobile-responsive design

Technical Requirements:
• React/Next.js frontend
• Web3 integration for wallet connections
• Chart.js or D3.js for data visualization
• RESTful API integration for DeFi protocols
• Responsive design for mobile and desktop

The dashboard should be intuitive, fast, and provide actionable insights for DeFi users. Focus on clean UI/UX and optimal performance.`,
        reward: 500,
        rewardCurrency: 'APT',
        category: 'frontend',
        status: 'OPEN',
        dueDate: '2024-02-15',
        progress: 0,
        tags: ['React', 'DeFi', 'Dashboard', 'Web3', 'UI/UX'],
        project: 'DeFi Analytics Platform',
        createdAt: '2024-01-10',
        creator: {
          id: '1',
          username: 'CryptoQueen',
          avatar: '/avatars/queen.jpg'
        },
        submissions: [
          {
            id: '1',
            content: 'I have experience building DeFi dashboards and can deliver this project within the timeline. I\'ll use React with TypeScript, Chart.js for visualizations, and integrate with multiple DEX APIs.',
            status: 'PENDING',
            createdAt: '2024-01-12',
            user: {
              id: '2',
              username: 'BlockchainBob',
              avatar: '/avatars/bob.jpg'
            }
          },
          {
            id: '2',
            content: 'I\'ve built similar dashboards before. I can implement all the required features including real-time data feeds, portfolio tracking, and mobile responsiveness.',
            status: 'PENDING',
            createdAt: '2024-01-13',
            user: {
              id: '3',
              username: 'DeFiDev',
              avatar: '/avatars/dev.jpg'
            }
          }
        ]
      };
      
      setBounty(mockBounty);
    } catch (error) {
      console.error('Error fetching bounty details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionContent.trim()) return;

    try {
      setSubmitting(true);
      
      // Simulate submission
      console.log('Submitting:', submissionContent);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmissionContent('');
      setShowSubmissionForm(false);
      // Refresh bounty data
      fetchBountyDetails();
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'OPEN': '#28a745',
      'IN_REVIEW': '#ffc107',
      'COMPLETED': '#17a2b8',
      'CANCELLED': '#dc3545'
    };
    return colors[status] || '#6C757D';
  };

  const getSubmissionStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'PENDING': '#ffc107',
      'APPROVED': '#28a745',
      'REJECTED': '#dc3545'
    };
    return colors[status] || '#6C757D';
  };

  if (loading) {
    return (
      <div className="bounty-details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading bounty details...</p>
        </div>
      </div>
    );
  }

  if (!bounty) {
    return (
      <div className="bounty-details-page">
        <div className="error-container">
          <p>Bounty not found</p>
          <Link href="/" className="back-button">
            ← Back to Bounties
          </Link>
        </div>
      </div>
    );
  }

  // Helper functions for icon and color
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      design: '🎨',
      video: '🎬',
      content: '📝',
      development: '🔧',
      social: '🌟',
      educational: '📖',
      frontend: '💻',
      backend: '🖥️',
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
      frontend: '#27AE60',
      backend: '#E67E22',
    };
    return colors[category] || '#95A5A6';
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bounty-details-page">
      <div className="bounty-details-container">
        <div className="bounty-details-header">
          <Link href="/" className="back-button" style={{ position: 'absolute', left: 30, top: 30, fontWeight: 700, color: '#2C3E50', textDecoration: 'underline' }}>
            ← Back to Bounties
          </Link>
          <div 
            className="bounty-details-icon"
            style={{ backgroundColor: getCategoryColor(bounty.category) }}
          >
            {getCategoryIcon(bounty.category)}
          </div>
          <div className="bounty-details-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <span className="status-badge" style={{ background: getStatusColor(bounty.status), color: '#fff', fontWeight: 800, padding: '8px 18px', borderRadius: 20, fontSize: 14 }}>{bounty.status}</span>
              <span className="bounty-category" style={{ color: getCategoryColor(bounty.category), fontWeight: 800, fontSize: 14, textTransform: 'uppercase' }}>{bounty.category}</span>
            </div>
            <h1 className="bounty-details-title">{bounty.title}</h1>
            <div className="bounty-details-meta">
              <span>{bounty.project}</span>
              {bounty.dueDate && <span>• Due: {formatDate(bounty.dueDate)}</span>}
            </div>
          </div>
          <div className="bounty-details-reward">
            <span className="reward-amount">{bounty.reward} {bounty.rewardCurrency}</span>
            <span className="reward-label">Reward</span>
          </div>
        </div>
        <div className="bounty-details-content">
          <div className="bounty-details-section">
            <h2 className="section-title">Description</h2>
            <div className="bounty-description">
              {bounty.description.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          {bounty.tags && bounty.tags.length > 0 && (
            <div className="bounty-details-section">
              <h2 className="section-title">Tags</h2>
              <div className="bounty-tags">
                {bounty.tags.map((tag, idx) => (
                  <span key={idx} className={`tag ${bounty.category}`}>{tag}</span>
                ))}
              </div>
            </div>
          )}
          <div className="bounty-details-section">
            <h2 className="section-title">Details</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontWeight: 700, color: '#2C3E50' }}>
              <div>Created: {formatDate(bounty.createdAt)}</div>
              {bounty.dueDate && <div>Due Date: {formatDate(bounty.dueDate)}</div>}
              <div>Progress: {bounty.progress}%</div>
              <div>Submissions: {bounty.submissions.length}</div>
            </div>
          </div>
          <div className="bounty-details-section">
            <h2 className="section-title">Created by</h2>
            <div className="bounty-creator">
              <div className="creator-avatar">
                {bounty.creator.avatar ? (
                  <img src={bounty.creator.avatar} alt={bounty.creator.username} />
                ) : (
                  <div className="avatar-placeholder">{bounty.creator.username.charAt(0)}</div>
                )}
              </div>
              <div className="creator-info">
                <span className="creator-name">{bounty.creator.username}</span>
                <span className="creator-date">Bounty Creator</span>
              </div>
            </div>
          </div>
          <div className="bounty-details-section submissions-section">
            <div className="submissions-header">
              <h2 className="section-title" style={{ borderBottom: 'none', paddingBottom: 0 }}>Submissions ({bounty.submissions.length})</h2>
              <button 
                className="btn-primary"
                onClick={() => setShowSubmissionForm(!showSubmissionForm)}
              >
                {showSubmissionForm ? 'Cancel' : 'Submit Solution'}
              </button>
            </div>
            {showSubmissionForm && (
              <form onSubmit={handleSubmitSubmission} className="submission-form">
                <div className="form-group">
                  <label className="form-label">Your Submission</label>
                  <textarea
                    className="form-textarea"
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    placeholder="Describe your solution, approach, and timeline..."
                    rows={6}
                    required
                  />
                </div>
                <div className="submission-form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Solution'}
                  </button>
                </div>
              </form>
            )}
            <div className="submissions-list">
              {bounty.submissions.length === 0 ? (
                <p className="no-submissions">No submissions yet. Be the first to submit!</p>
              ) : (
                bounty.submissions.map((submission) => (
                  <div key={submission.id} className="submission-item">
                    <div className="submission-user">
                      <div className="submission-avatar">
                        {submission.user.avatar ? (
                          <img src={submission.user.avatar} alt={submission.user.username} />
                        ) : (
                          <div className="avatar-placeholder">{submission.user.username.charAt(0)}</div>
                        )}
                      </div>
                      <div className="submission-info">
                        <span className="submission-username">{submission.user.username}</span>
                        <span className="submission-date">{formatDate(submission.createdAt)}</span>
                      </div>
                    </div>
                    <div className="submission-status">
                      <span className={`status-badge ${submission.status.toLowerCase()}`}>{submission.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 