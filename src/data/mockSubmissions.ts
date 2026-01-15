export interface SocialMediaAccount {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'xhs';
  link?: string;
  username?: string;
  password?: string;
}

export interface Submission {
  id: string;
  submittedAt: string;
  status: 'new' | 'in_review' | 'approved' | 'completed';

  // Page 1 - Basics
  businessName: string;
  businessType: 'restaurant' | 'other';
  otherBusinessType?: string;
  cuisine?: string;
  website?: string;
  hasExistingSocial: boolean;
  existingSocialAccounts?: SocialMediaAccount[];
  preferredUsername?: string;
  preferredUsernameAlt?: string;
  selectedPlatforms?: ('instagram' | 'facebook' | 'tiktok' | 'xhs')[];
  wantsNewSocial?: boolean;

  // Page 2 - What Makes You Special
  keyOfferings: string[];
  uniqueSellingPoints: string[];
  customOffering?: string;
  customUSP?: string;

  // Page 3 - Create Your Look
  selectedTypography: string;
  selectedColorPalette: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  inspirationLinks?: string[];

  // Page 4 - Craft Your Message
  targetAudience: string[];
  customAudience?: string;
  coreMessage: string;
  businessStory: string;
  accessPreference?: 'credentials' | 'admin_access';
  localCompetitors?: string[];
}

export const mockSubmissions: Submission[] = [
  {
    id: '1',
    submittedAt: '2024-01-14T10:30:00Z',
    status: 'new',
    businessName: 'Bella Italia Trattoria',
    businessType: 'restaurant',
    cuisine: 'Italian',
    website: 'https://bellaitalia.com',
    hasExistingSocial: true,
    existingSocialAccounts: [
      { platform: 'instagram', link: 'https://instagram.com/bellaitalia', username: 'bellaitalia' },
      { platform: 'facebook', link: 'https://facebook.com/bellaitalia', username: 'bellaitalia' },
    ],
    keyOfferings: ['Dine-in Experience', 'Private Events', 'Catering Services'],
    uniqueSellingPoints: ['Family Recipes Passed Down Generations', 'Authentic Regional Cuisine', 'Intimate & Cozy Atmosphere'],
    selectedTypography: 'elegant',
    selectedColorPalette: 'earthy',
    inspirationLinks: ['https://instagram.com/carbone'],
    targetAudience: ['Couples & Date Night', 'Food Enthusiasts & Foodies'],
    coreMessage: 'Authentic Italian flavors, crafted with love since 1985',
    businessStory: 'Our family brought the recipes from Tuscany three generations ago. Every dish tells a story of our homeland, prepared with the same love and care as our nonnas kitchen.',
    accessPreference: 'admin_access',
    localCompetitors: ['Olive Garden', 'Maggianos'],
  },
  {
    id: '2',
    submittedAt: '2024-01-13T15:45:00Z',
    status: 'in_review',
    businessName: 'Tokyo Ramen House',
    businessType: 'restaurant',
    cuisine: 'Japanese',
    website: 'https://tokyoramenhouse.com',
    hasExistingSocial: false,
    preferredUsername: 'tokyoramenhouse',
    selectedPlatforms: ['instagram', 'tiktok'],
    keyOfferings: ['Dine-in Experience', 'Takeaway & Delivery', 'Late Night Menu'],
    uniqueSellingPoints: ['Authentic Regional Cuisine', 'Secret Family Recipe', 'Instagram-worthy Presentation'],
    selectedTypography: 'bold',
    selectedColorPalette: 'midnight',
    targetAudience: ['Young Professionals (25-35)', 'Food Enthusiasts & Foodies', 'Students & Young Adults'],
    coreMessage: 'Soul-warming ramen, authentically Japanese',
    businessStory: 'After training for 5 years in Tokyo under a master ramen chef, I brought the art of perfect broth to our city. Each bowl takes 18 hours to prepare.',
    localCompetitors: ['Ichiran', 'Ippudo'],
  },
  {
    id: '3',
    submittedAt: '2024-01-12T09:15:00Z',
    status: 'approved',
    businessName: 'Green Leaf Wellness Studio',
    businessType: 'other',
    otherBusinessType: 'Wellness & Yoga Studio',
    website: 'https://greenleafwellness.com',
    hasExistingSocial: true,
    existingSocialAccounts: [
      { platform: 'instagram', link: 'https://instagram.com/greenleafwellness', username: 'greenleafwellness' },
    ],
    keyOfferings: ['Private Events', 'Weekend Brunch'],
    uniqueSellingPoints: ['Health-conscious Options', 'Sustainable & Eco-friendly'],
    selectedTypography: 'classic',
    selectedColorPalette: 'ocean',
    inspirationLinks: ['https://instagram.com/yogawithadriene'],
    targetAudience: ['Health-conscious Diners', 'Young Professionals (25-35)'],
    coreMessage: 'Find your balance, nurture your soul',
    businessStory: 'Green Leaf was born from my own journey to wellness. After years in corporate life, I discovered yoga and meditation. Now I share that peace with our community.',
    accessPreference: 'credentials',
    localCompetitors: ['CorePower Yoga', 'YogaWorks'],
  },
  {
    id: '4',
    submittedAt: '2024-01-11T14:20:00Z',
    status: 'completed',
    businessName: 'Spice Route Kitchen',
    businessType: 'restaurant',
    cuisine: 'Indian',
    hasExistingSocial: false,
    preferredUsername: 'spiceroutekitchen',
    selectedPlatforms: ['instagram', 'facebook', 'tiktok'],
    keyOfferings: ['Dine-in Experience', 'Takeaway & Delivery', 'Catering Services', 'Family-friendly Dining'],
    uniqueSellingPoints: ['Farm-to-table Fresh Ingredients', 'Authentic Regional Cuisine', 'Health-conscious Options'],
    selectedTypography: 'modern',
    selectedColorPalette: 'sunset',
    targetAudience: ['Families with Children', 'Food Enthusiasts & Foodies', 'Local Community'],
    coreMessage: 'A journey through Indias diverse flavors',
    businessStory: 'From the streets of Mumbai to the royal kitchens of Rajasthan, we bring you authentic recipes from every corner of India. Our spices are sourced directly from local farmers.',
    localCompetitors: ['Curry House', 'Bombay Palace'],
  },
  {
    id: '5',
    submittedAt: '2024-01-10T11:00:00Z',
    status: 'new',
    businessName: 'The Coffee Collective',
    businessType: 'other',
    otherBusinessType: 'Specialty Coffee Shop',
    website: 'https://coffeecollective.co',
    hasExistingSocial: true,
    existingSocialAccounts: [
      { platform: 'instagram', link: 'https://instagram.com/coffeecollectiveco', username: 'coffeecollectiveco' },
    ],
    keyOfferings: ['Dine-in Experience', 'Takeaway & Delivery', 'Weekend Brunch'],
    uniqueSellingPoints: ['Sustainable & Eco-friendly', 'Locally Sourced Produce', 'Intimate & Cozy Atmosphere'],
    selectedTypography: 'modern',
    selectedColorPalette: 'earthy',
    inspirationLinks: ['https://instagram.com/bluebottlecoffee', 'https://instagram.com/stumptown'],
    targetAudience: ['Young Professionals (25-35)', 'Students & Young Adults', 'Business Professionals'],
    coreMessage: 'Ethically sourced, expertly crafted',
    businessStory: 'We believe great coffee starts at the source. We work directly with farmers in Colombia, Ethiopia, and Guatemala to bring you the finest single-origin beans, roasted in-house daily.',
    accessPreference: 'admin_access',
    localCompetitors: ['Blue Bottle', 'Stumptown'],
  },
];

export const getSubmissionById = (id: string): Submission | undefined => {
  return mockSubmissions.find(s => s.id === id);
};

export const getSubmissionsByStatus = (status: Submission['status']): Submission[] => {
  return mockSubmissions.filter(s => s.status === status);
};
