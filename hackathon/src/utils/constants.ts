export const APPROVED_SCHOOLS = [
  'DePaul',
  'UIC',
  'Roosevelt',
  'Columbia College',
  'Harold Washington',
] as const;

export const SCHOOL_EMAIL_DOMAINS: Record<(typeof APPROVED_SCHOOLS)[number], string[]> = {
  DePaul: ['depaul.edu'],
  UIC: ['uic.edu'],
  Roosevelt: ['roosevelt.edu'],
  'Columbia College': ['colum.edu'],
  'Harold Washington': ['ccc.edu'],
};

export const YEAR_OPTIONS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'] as const;
export const GENDER_OPTIONS = ['Man', 'Woman', 'Non-binary', 'Other'] as const;
export const PRONOUN_OPTIONS = ['He/Him', 'She/Her', 'They/Them', 'Other'] as const;
export const LOOKING_FOR_OPTIONS = ['Men', 'Women', 'Everyone'] as const;

export const CHICAGO_TIMEZONE = 'America/Chicago';
