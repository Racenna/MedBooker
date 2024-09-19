import {
  createAppointment,
  getAppointment,
  getRecentAppointmentList,
  updateAppointment,
} from '@/lib/actions/appointment.actions';
import { databases } from '@/lib/appwrite.config';
import { parseStringify } from '@/lib/utils';
import { Appointment, Patient } from '@/types/appwrite.types';
import { Query } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

// jest.mock('@/src/lib/appwrite.config', () => ({ //! not working with async/await variant in jest.config.ts
jest.mock('../../../../src/lib/appwrite.config', () => ({
  DATABASE_ID: 'testDatabaseId',
  APPOINTMENT_COLLECTION_ID: 'testCollectionId',
  databases: {
    createDocument: jest.fn(),
    getDocument: jest.fn(),
    listDocuments: jest.fn(),
    updateDocument: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('createAppointment', () => {
  const mockAppointment: CreateAppointmentParams = {
    userId: 'userID',
    patient: 'patientID',
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'pending',
    note: 'note',
  };

  it('Should create an appointment successfully', async () => {
    (databases.createDocument as jest.Mock).mockResolvedValueOnce({
      $id: 'appointmentId',
      ...mockAppointment,
    });

    const result = await createAppointment(mockAppointment);

    expect(databases.createDocument).toHaveBeenCalledWith(
      'testDatabaseId', // DATABASE_ID
      'testCollectionId', // APPOINTMENT_COLLECTION_ID
      expect.any(String), // ID.unique()
      mockAppointment
    );

    expect(result).toEqual(
      parseStringify({
        $id: 'appointmentId',
        ...mockAppointment,
      })
    );
  });
});

describe('getAppointment', () => {
  const mockAppointmentId = 'appointmentId';
  const mockPatient: Patient = {
    $id: 'patientId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userId',
    name: 'name',
    email: 'mock@mail.com',
    phone: '123-123-123',
    birthDate: new Date('09/09/2000 12:30:00.000 PM'),
    gender: 'other',
    address: 'address',
    occupation: 'occupation',
    emergencyContactName: 'emergency contact name',
    emergencyContactNumber: '321-321-321',
    primaryPhysician: 'primary physician',
    insuranceProvider: 'insurance provider',
    insurancePolicyNumber: 'insurance policy number',
    allergies: undefined,
    currentMedication: undefined,
    familyMedicalHistory: undefined,
    pastMedicalHistory: undefined,
    identificationType: undefined,
    identificationNumber: undefined,
    identificationDocument: undefined,
    privacyConsent: false,
  };
  const mockAppointment: Appointment = {
    $id: 'appointmentId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userID',
    patient: mockPatient,
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'pending',
    note: 'note',
    cancellationReason: null,
  };

  it('Should get the appointment data successfully', async () => {
    (databases.getDocument as jest.Mock).mockResolvedValueOnce({
      ...mockAppointment,
    });

    const result = await getAppointment(mockAppointmentId);

    expect(databases.getDocument).toHaveBeenCalledWith(
      'testDatabaseId',
      'testCollectionId',
      mockAppointmentId
    );

    expect(result).toEqual(parseStringify(mockAppointment));
  });
});

describe('getRecentAppointmentList', () => {
  const mockPatient: Patient = {
    $id: 'patientId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userId',
    name: 'name',
    email: 'mock@mail.com',
    phone: '123-123-123',
    birthDate: new Date('09/09/2000 12:30:00.000 PM'),
    gender: 'other',
    address: 'address',
    occupation: 'occupation',
    emergencyContactName: 'emergency contact name',
    emergencyContactNumber: '321-321-321',
    primaryPhysician: 'primary physician',
    insuranceProvider: 'insurance provider',
    insurancePolicyNumber: 'insurance policy number',
    allergies: undefined,
    currentMedication: undefined,
    familyMedicalHistory: undefined,
    pastMedicalHistory: undefined,
    identificationType: undefined,
    identificationNumber: undefined,
    identificationDocument: undefined,
    privacyConsent: false,
  };
  const mockCancelledAppointment: Appointment = {
    $id: 'appointmentId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userID',
    patient: mockPatient,
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'cancelled',
    note: 'note',
    cancellationReason: null,
  };
  const mockPendingAppointment: Appointment = {
    $id: 'appointmentId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userID',
    patient: mockPatient,
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'pending',
    note: 'note',
    cancellationReason: null,
  };
  const mockScheduledAppointment: Appointment = {
    $id: 'appointmentId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userID',
    patient: mockPatient,
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'scheduled',
    note: 'note',
    cancellationReason: null,
  };

  const mockTotalCount = 9;
  const mockDocuments = [
    ...Array(3).fill(mockCancelledAppointment),
    ...Array(2).fill(mockPendingAppointment),
    ...Array(4).fill(mockScheduledAppointment),
  ];

  const orderByCreatedAt = [Query.orderDesc('$createdAt')];

  it('Should get recent appointment data successfully', async () => {
    (databases.listDocuments as jest.Mock).mockResolvedValueOnce({
      total: mockTotalCount,
      documents: mockDocuments,
    });

    const result = await getRecentAppointmentList();

    expect(databases.listDocuments).toHaveBeenCalledWith(
      'testDatabaseId',
      'testCollectionId',
      orderByCreatedAt
    );

    expect(result).toEqual(
      parseStringify({
        totalCount: mockTotalCount,
        cancelledCount: 3,
        pendingCount: 2,
        scheduledCount: 4,
        documents: mockDocuments,
      })
    );
  });
});

describe('updateAppointment', () => {
  const mockPatient: Patient = {
    $id: 'patientId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userId',
    name: 'name',
    email: 'mock@mail.com',
    phone: '123-123-123',
    birthDate: new Date('09/09/2000 12:30:00.000 PM'),
    gender: 'other',
    address: 'address',
    occupation: 'occupation',
    emergencyContactName: 'emergency contact name',
    emergencyContactNumber: '321-321-321',
    primaryPhysician: 'primary physician',
    insuranceProvider: 'insurance provider',
    insurancePolicyNumber: 'insurance policy number',
    allergies: undefined,
    currentMedication: undefined,
    familyMedicalHistory: undefined,
    pastMedicalHistory: undefined,
    identificationType: undefined,
    identificationNumber: undefined,
    identificationDocument: undefined,
    privacyConsent: false,
  };
  const mockAppointment: Appointment = {
    $id: 'appointmentId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userID',
    patient: mockPatient,
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'pending',
    note: 'note',
    cancellationReason: null,
  };
  const mockUpdateAppointment: UpdateAppointmentParams = {
    userId: 'userId',
    appointmentId: 'appointmentId',
    type: 'cancel',
    appointment: {
      status: 'cancelled',
      cancellationReason: 'new cancellation reason',
    },
  };

  it('Should update the appointment data successfully', async () => {
    (databases.updateDocument as jest.Mock).mockResolvedValueOnce({
      ...mockAppointment,
      ...mockUpdateAppointment.appointment,
    });

    const result = await updateAppointment(mockUpdateAppointment);

    expect(databases.updateDocument).toHaveBeenCalledWith(
      'testDatabaseId',
      'testCollectionId',
      mockUpdateAppointment.appointmentId,
      mockUpdateAppointment.appointment
    );

    expect(revalidatePath).toHaveBeenCalledTimes(1);

    expect(result).toEqual(
      parseStringify({
        ...mockAppointment,
        ...mockUpdateAppointment.appointment,
      })
    );
  });
});
