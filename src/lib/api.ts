export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  rewardCurrency: string;
  category: string;
  status: 'OPEN' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  project: string;
  dueDate?: string;
  progress: number;
  tags: string[];
  createdAt: string;
  creator: {
    id: string;
    username: string;
    avatar?: string;
  };
  submissions: Submission[];
}

export interface Submission {
  id: string;
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  bounty: {
    id: string;
    title: string;
    reward: number;
    rewardCurrency: string;
  };
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export interface UserStats {
  earnings: number;
  tasksCount: number;
  recentSubmissions: Submission[];
  recentBounties: Bounty[];
}

export interface CreateBountyData {
  title: string;
  description: string;
  reward: number;
  category: string;
  project: string;
  dueDate?: string;
  tags: string[];
}

export interface CreateSubmissionData {
  bountyId: string;
  content: string;
}

class ApiService {
  private baseUrl = '/api';

  async getBounties(params?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<Bounty[]> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);

    const response = await fetch(`${this.baseUrl}/bounties?${searchParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bounties');
    }
    return response.json();
  }

  async createBounty(data: CreateBountyData): Promise<Bounty> {
    const response = await fetch(`${this.baseUrl}/bounties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create bounty');
    }
    return response.json();
  }

  async getSubmissions(params?: {
    bountyId?: string;
    status?: string;
  }): Promise<Submission[]> {
    const searchParams = new URLSearchParams();
    if (params?.bountyId) searchParams.append('bountyId', params.bountyId);
    if (params?.status) searchParams.append('status', params.status);

    const response = await fetch(`${this.baseUrl}/submissions?${searchParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    return response.json();
  }

  async createSubmission(data: CreateSubmissionData): Promise<Submission> {
    const response = await fetch(`${this.baseUrl}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create submission');
    }
    return response.json();
  }

  async getUserStats(): Promise<UserStats> {
    const response = await fetch(`${this.baseUrl}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }
    return response.json();
  }
}

export const apiService = new ApiService(); 