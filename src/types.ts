export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  locality: string;
  salaryMin: number;
  salaryMax: number;
  type: 'Full time' | 'Part time' | 'Contract';
  mode: 'On-site' | 'Hybrid' | 'Remote';
  experience: string;
  posted: string;
  urgent?: boolean;
  verified?: boolean;
  skills: string[];
  description: string;
  initials: string;
  color: string;
};

export type Application = {
  jobId: string;
  appliedAt: string;
  status: 'Applied' | 'In review' | 'Interview';
};

export type Page = 'home' | 'jobs' | 'saved' | 'tracker' | 'employers';

export type LocalUser = {
  name: string;
  identifier: string;
  role: 'candidate' | 'employer';
};
