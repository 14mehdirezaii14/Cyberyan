import type { IExperienceItem } from '@workspace/shared';

export const formatIndustry = (industry?: string | string[] | null): string => {
  if (!industry) return '-';
  if (Array.isArray(industry)) {
    return industry.join(', ');
  }
  return industry;
};

export const formatJobTitle = (jobTitle?: string | IExperienceItem[] | null): string => {
  if (!jobTitle) return '-';
  
  if (typeof jobTitle === 'string') {
    return jobTitle;
  }
  
  if (Array.isArray(jobTitle) && jobTitle.length > 0) {
    const primaryJob = jobTitle.find((job) => job.is_primary) || jobTitle[0];
    return primaryJob?.title?.name || '-';
  }
  
  return '-';
};