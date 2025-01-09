export type Comment = {
  id: number;
  content: string;
  author: string;
  timestamp: string;
};

export type IncidentStatus = 'pending review' | 'under review' | 'resolved';

export type LiveFeed = {
  id: number;
  name: string;
};

export type Incident = {
  id: number;
  title: string;
  status: IncidentStatus;
  timestamp: string;
  description: string;
  comments: Comment[];
  liveFeed: LiveFeed;
};

