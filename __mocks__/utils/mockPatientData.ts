import { Patient } from '@/types/appwrite.types';
import { MOCK_BUCKET_ID, MOCK_ENDPOINT, MOCK_PROJECT_ID } from './mockEnv';

export const createMockNewPatientData = (
  identificationDocument?: FormData
): RegisterUserParams => {
  return {
    userId: 'userId',
    name: 'name',
    email: 'mock@mail.com',
    phone: '+33 1 23 45 67 89',
    birthDate: new Date('09/09/2000 12:30:00.000 PM'),
    gender: 'other',
    address: 'address',
    occupation: 'occupation',
    emergencyContactName: 'emergency contact name',
    emergencyContactNumber: '+49 30 12345678',
    primaryPhysician: 'primary physician',
    insuranceProvider: 'insurance provider',
    insurancePolicyNumber: 'insurance policy number',
    allergies: undefined,
    currentMedication: undefined,
    familyMedicalHistory: undefined,
    pastMedicalHistory: undefined,
    identificationType: undefined,
    identificationNumber: undefined,
    identificationDocument,
    privacyConsent: false,
  };
};

export const createMockExistingPatientData = (
  identificationDocument?: FormData
): Patient => {
  return {
    $id: 'patientId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userId',
    name: 'name',
    email: 'mock@mail.com',
    phone: '+33 1 23 45 67 89',
    birthDate: new Date('09/09/2000 12:30:00.000 PM'),
    gender: 'other',
    address: 'address',
    occupation: 'occupation',
    emergencyContactName: 'emergency contact name',
    emergencyContactNumber: '+49 30 12345678',
    primaryPhysician: 'primary physician',
    insuranceProvider: 'insurance provider',
    insurancePolicyNumber: 'insurance policy number',
    allergies: undefined,
    currentMedication: undefined,
    familyMedicalHistory: undefined,
    pastMedicalHistory: undefined,
    identificationType: undefined,
    identificationNumber: undefined,
    identificationDocument,
    privacyConsent: false,
  };
};

export const createMockPatientFileUrl = (fileId?: string): string => {
  return `${MOCK_ENDPOINT}/storage/buckets/${MOCK_BUCKET_ID}/files/${fileId}/view?project=${MOCK_PROJECT_ID}`;
};
