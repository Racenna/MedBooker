import { Appointment } from '@/types/appwrite.types';

import { createMockExistingPatientData } from './mockPatientData';

export const mockAppointmentId = 'appointmentId';

export const createMockNewAppointmentData = (): CreateAppointmentParams => {
  return {
    userId: 'userID',
    patient: 'patientID',
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: 'pending',
    note: 'note',
  };
};

export const createMockExistingAppointmentData = (status?: Status): Appointment => {
  return {
    $id: 'appointmentId',
    $collectionId: 'collectionId',
    $databaseId: 'databaseId',
    $createdAt: 'createdAt',
    $updatedAt: 'updatedAt',
    $permissions: [],
    userId: 'userID',
    patient: createMockExistingPatientData(),
    primaryPhysician: 'John Doe',
    reason: 'reason',
    schedule: new Date('09/09/2024 12:30:00.000 PM'),
    status: status ?? 'pending',
    note: 'note',
    cancellationReason: null,
  };
};

export const createMockExistingAppointmentArray = (
  count: number = 1,
  status?: Status
): Appointment[] => {
  return Array(count).fill(createMockExistingAppointmentData(status));
};

export const createMockUpdateAppointmentData = (): UpdateAppointmentParams => {
  return {
    userId: 'userId',
    appointmentId: 'appointmentId',
    type: 'cancel',
    appointment: {
      status: 'cancelled',
      cancellationReason: 'new cancellation reason',
    },
  };
};
