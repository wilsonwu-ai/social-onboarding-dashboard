import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Submission, SocialMediaAccount } from '../data/mockSubmissions';

const COLLECTION_NAME = 'submissions';

const VALID_STATUSES = ['new', 'in_review', 'approved', 'completed'] as const;
const VALID_PLATFORMS = ['instagram', 'facebook', 'tiktok', 'xhs'] as const;

function safeArray<T>(value: unknown, filter?: (item: unknown) => item is T): T[] {
  if (!Array.isArray(value)) return [];
  return filter ? value.filter(filter) : value.filter((v) => v != null) as T[];
}

function isValidSocialAccount(item: unknown): item is SocialMediaAccount {
  return typeof item === 'object' && item !== null && 'platform' in item
    && VALID_PLATFORMS.includes((item as any).platform);
}

// Convert Firestore document to Submission type
function docToSubmission(docSnapshot: any): Submission {
  const data = docSnapshot.data();

  let submittedAt: string;
  try {
    submittedAt = data.submittedAt instanceof Timestamp
      ? data.submittedAt.toDate().toISOString()
      : (typeof data.submittedAt === 'string' ? data.submittedAt : new Date().toISOString());
  } catch {
    submittedAt = new Date().toISOString();
  }

  const status = VALID_STATUSES.includes(data.status) ? data.status : 'new';

  const customColors = (
    data.customColors
    && typeof data.customColors === 'object'
    && typeof data.customColors.primary === 'string'
    && typeof data.customColors.secondary === 'string'
    && typeof data.customColors.accent === 'string'
  ) ? data.customColors : undefined;

  return {
    id: docSnapshot.id,
    submittedAt,
    status,
    businessName: data.businessName || '',
    businessType: data.businessType || 'other',
    otherBusinessType: data.otherBusinessType,
    cuisine: data.cuisine,
    website: data.website,
    hasExistingSocial: data.hasExistingSocial ?? false,
    existingSocialAccounts: safeArray(data.existingSocialAccounts, isValidSocialAccount),
    preferredUsername: data.preferredUsername,
    preferredUsernameAlt: data.preferredUsernameAlt,
    selectedPlatforms: safeArray<string>(data.selectedPlatforms).filter((p): p is typeof VALID_PLATFORMS[number] => VALID_PLATFORMS.includes(p as any)),
    wantsNewSocial: data.wantsNewSocial,
    keyOfferings: safeArray(data.keyOfferings),
    uniqueSellingPoints: safeArray(data.uniqueSellingPoints),
    customOffering: data.customOffering,
    customUSP: data.customUSP,
    selectedTypography: data.selectedTypography || '',
    selectedColorPalette: data.selectedColorPalette || '',
    customColors,
    inspirationLinks: safeArray(data.inspirationLinks),
    targetAudience: safeArray(data.targetAudience),
    customAudience: data.customAudience,
    coreMessage: data.coreMessage || '',
    businessStory: data.businessStory || '',
    accessPreference: data.accessPreference,
    localCompetitors: safeArray(data.localCompetitors),
  };
}

// Get all submissions
export async function getSubmissions(): Promise<Submission[]> {
  const submissionsRef = collection(db, COLLECTION_NAME);
  const q = query(submissionsRef, orderBy('submittedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToSubmission);
}

// Get a single submission by ID
export async function getSubmissionById(id: string): Promise<Submission | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    return null;
  }

  return docToSubmission(docSnapshot);
}

// Update submission status
export async function updateSubmissionStatus(
  id: string,
  status: Submission['status']
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
}
