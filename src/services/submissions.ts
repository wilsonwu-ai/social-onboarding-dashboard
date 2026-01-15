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
import type { Submission } from '../data/mockSubmissions';

const COLLECTION_NAME = 'submissions';

// Convert Firestore document to Submission type
function docToSubmission(docSnapshot: any): Submission {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    submittedAt: data.submittedAt instanceof Timestamp
      ? data.submittedAt.toDate().toISOString()
      : data.submittedAt,
    status: data.status || 'new',
    businessName: data.businessName || '',
    businessType: data.businessType || 'other',
    otherBusinessType: data.otherBusinessType,
    cuisine: data.cuisine,
    website: data.website,
    hasExistingSocial: data.hasExistingSocial ?? false,
    existingSocialAccounts: data.existingSocialAccounts,
    preferredUsername: data.preferredUsername,
    preferredUsernameAlt: data.preferredUsernameAlt,
    selectedPlatforms: data.selectedPlatforms,
    wantsNewSocial: data.wantsNewSocial,
    keyOfferings: data.keyOfferings || [],
    uniqueSellingPoints: data.uniqueSellingPoints || [],
    customOffering: data.customOffering,
    customUSP: data.customUSP,
    selectedTypography: data.selectedTypography || '',
    selectedColorPalette: data.selectedColorPalette || '',
    customColors: data.customColors,
    inspirationLinks: data.inspirationLinks,
    targetAudience: data.targetAudience || [],
    customAudience: data.customAudience,
    coreMessage: data.coreMessage || '',
    businessStory: data.businessStory || '',
    accessPreference: data.accessPreference,
    localCompetitors: data.localCompetitors,
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
