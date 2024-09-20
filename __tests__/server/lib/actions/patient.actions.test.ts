import { Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import {
  createUser,
  getUser,
  registerPatient,
  getPatient,
} from '@/lib/actions/patient.actions';
import { parseStringify } from '@/lib/utils';
import { databases, storage, users } from '@/lib/appwrite.config';
import {
  mockUserId,
  createMockNewUserData,
  createMockExistingUserData,
} from '../../../../__mocks__/utils/mockUserData';
import {
  createMockExistingPatientData,
  createMockNewPatientData,
  createMockPatientFileUrl,
} from '../../../../__mocks__/utils/mockPatientData';
import {
  MOCK_DATABASE_ID,
  MOCK_PATIENT_COLLECTION_ID,
  MOCK_BUCKET_ID,
} from '../../../../__mocks__/utils/mockEnv';

describe('createUser', () => {
  const mockNewUserData = createMockNewUserData();

  it('Should successfully create the user', async () => {
    (users.create as jest.Mock).mockResolvedValueOnce({
      $id: 'userId',
      ...mockNewUserData,
    });

    const result = await createUser(mockNewUserData);

    expect(users.create).toHaveBeenCalledWith(
      expect.any(String), // ID.unique()
      mockNewUserData.email,
      mockNewUserData.phone,
      undefined,
      mockNewUserData.name
    );

    expect(result).toEqual(
      parseStringify({
        $id: 'userId',
        ...mockNewUserData,
      })
    );
  });

  it('Creating a new user with an existing email should result in an error', async () => {
    const errorMessage =
      'A user with the same email already exists in the current project.';

    (users.create as jest.Mock).mockRejectedValueOnce({
      message: errorMessage,
      type: 'user_email_already_exists',
      code: 409,
    });

    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    const error = await createUser(mockNewUserData);

    expect(error).toBeDefined();
    expect(error).toEqual(errorMessage);
    expect(console.error).toHaveBeenCalledWith(
      'An error occurred while creating a new user:',
      expect.objectContaining({ message: errorMessage })
    );

    errorSpy.mockRestore();
  });
});

describe('getUser', () => {
  const mockUserData = createMockExistingUserData();

  it('Should get the user data successfully', async () => {
    (users.get as jest.Mock).mockResolvedValueOnce({
      ...mockUserData,
    });

    const result = await getUser(mockUserId);

    expect(users.get).toHaveBeenCalledWith(mockUserId);

    expect(result).toEqual(parseStringify(mockUserData));
  });
});

describe('registerPatient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should register new patient successfully (without file)', async () => {
    const mockNewPatientData = createMockNewPatientData();
    const { identificationDocument, ...restMockPatientData } = mockNewPatientData;

    const mockExistingPatientData = createMockExistingPatientData();

    (databases.createDocument as jest.Mock).mockResolvedValueOnce(
      mockExistingPatientData
    );

    const result = await registerPatient(mockNewPatientData);

    expect(databases.createDocument).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_PATIENT_COLLECTION_ID,
      expect.any(String), // ID.unique()
      expect.objectContaining({
        identificationDocumentId: null,
        identificationDocumentUrl: createMockPatientFileUrl(),
        ...restMockPatientData,
      })
    );

    expect(result).toEqual(parseStringify(mockExistingPatientData));
  });

  it('Should register new patient successfully (with file)', async () => {
    const mockFile = { $id: 'fileId' };
    const mockBlobFile = new Blob();

    const formData = new FormData();
    formData.append('blobFile', mockBlobFile);
    formData.append('fileName', 'mockFile.png');

    const mockIdentificationDocument = new Map<string, Blob | string>([
      ['blobFile', mockBlobFile],
      ['fileName', 'mockFile.png'],
    ]);

    const mockNewPatientWithFile = createMockNewPatientData(formData);
    const { identificationDocument, ...restMockPatientData } = mockNewPatientWithFile;
    const mockExistingPatientWithFile = createMockExistingPatientData(formData);

    (InputFile.fromBuffer as jest.Mock).mockReturnValue(mockIdentificationDocument);
    (storage.createFile as jest.Mock).mockResolvedValueOnce(mockFile);
    (databases.createDocument as jest.Mock).mockResolvedValueOnce(
      mockExistingPatientWithFile
    );

    const result = await registerPatient(mockNewPatientWithFile);

    expect(InputFile.fromBuffer).toHaveBeenCalledWith(
      formData.get('blobFile'),
      formData.get('fileName')
    );

    expect(storage.createFile).toHaveBeenCalledWith(
      MOCK_BUCKET_ID,
      expect.any(String), // ID.unique()
      mockIdentificationDocument
    );

    expect(databases.createDocument).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_PATIENT_COLLECTION_ID,
      expect.any(String), // ID.unique()
      expect.objectContaining({
        identificationDocumentId: mockFile.$id,
        identificationDocumentUrl: createMockPatientFileUrl(mockFile.$id),
        ...restMockPatientData,
      })
    );

    expect(result).toEqual(parseStringify(mockExistingPatientWithFile));
  });
});

describe('getPatient', () => {
  const mockPatientData = createMockExistingPatientData();

  it('Should get the patient data successfully', async () => {
    (databases.listDocuments as jest.Mock).mockResolvedValueOnce({
      documents: [mockPatientData],
    });

    const queryUserId = [Query.equal('userId', mockUserId)];

    const result = await getPatient(mockUserId);

    expect(databases.listDocuments).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_PATIENT_COLLECTION_ID,
      queryUserId
    );

    expect(result).toEqual(parseStringify(mockPatientData));
  });
});
