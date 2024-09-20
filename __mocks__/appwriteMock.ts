// appwrite mocks

import {
  MOCK_DATABASE_ID,
  MOCK_PATIENT_COLLECTION_ID,
  MOCK_APPOINTMENT_COLLECTION_ID,
  MOCK_BUCKET_ID,
  MOCK_PROJECT_ID,
  MOCK_ENDPOINT,
} from './utils/mockEnv';

// jest.mock('@/src/lib/appwrite.config', () => ({ //! not working with async/await variant in jest.config.ts
jest.mock('../src/lib/appwrite.config', () => ({
  DATABASE_ID: MOCK_DATABASE_ID,
  PATIENT_COLLECTION_ID: MOCK_PATIENT_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID: MOCK_APPOINTMENT_COLLECTION_ID,
  BUCKET_ID: MOCK_BUCKET_ID,
  PROJECT_ID: MOCK_PROJECT_ID,
  ENDPOINT: MOCK_ENDPOINT,
  databases: {
    createDocument: jest.fn(),
    getDocument: jest.fn(),
    listDocuments: jest.fn(),
    updateDocument: jest.fn(),
  },
  users: {
    create: jest.fn(),
    get: jest.fn(),
  },
  storage: {
    createFile: jest.fn(),
  },
}));

jest.mock('node-appwrite/file', () => ({
  InputFile: {
    fromBuffer: jest.fn(),
  },
}));
