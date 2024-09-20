import { Query } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import {
  createAppointment,
  getAppointment,
  getRecentAppointmentList,
  updateAppointment,
} from '@/lib/actions/appointment.actions';
import { parseStringify } from '@/lib/utils';
import { databases } from '@/lib/appwrite.config';

import {
  mockAppointmentId,
  createMockNewAppointmentData,
  createMockExistingAppointmentData,
  createMockExistingAppointmentArray,
  createMockUpdateAppointmentData,
} from '../../../../__mocks__/utils/mockAppointmentData';
import {
  MOCK_DATABASE_ID,
  MOCK_APPOINTMENT_COLLECTION_ID,
} from '../../../../__mocks__/utils/mockEnv';

describe('createAppointment', () => {
  const mockAppointment = createMockNewAppointmentData();

  it('Should create an appointment successfully', async () => {
    (databases.createDocument as jest.Mock).mockResolvedValueOnce({
      $id: 'appointmentId',
      ...mockAppointment,
    });

    const result = await createAppointment(mockAppointment);

    expect(databases.createDocument).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_APPOINTMENT_COLLECTION_ID,
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
  const mockAppointment = createMockExistingAppointmentData();

  it('Should get the appointment data successfully', async () => {
    (databases.getDocument as jest.Mock).mockResolvedValueOnce({
      ...mockAppointment,
    });

    const result = await getAppointment(mockAppointmentId);

    expect(databases.getDocument).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_APPOINTMENT_COLLECTION_ID,
      mockAppointmentId
    );

    expect(result).toEqual(parseStringify(mockAppointment));
  });
});

describe('getRecentAppointmentList', () => {
  const cancelledAppointment = createMockExistingAppointmentArray(3, 'cancelled');
  const pendingAppointment = createMockExistingAppointmentArray(2, 'pending');
  const scheduledAppointment = createMockExistingAppointmentArray(4, 'scheduled');

  const mockDocuments = [
    ...cancelledAppointment,
    ...pendingAppointment,
    ...scheduledAppointment,
  ];
  const totalCount = mockDocuments.length;

  const orderByCreatedAt = [Query.orderDesc('$createdAt')];

  it('Should get recent appointment data successfully', async () => {
    (databases.listDocuments as jest.Mock).mockResolvedValueOnce({
      total: totalCount,
      documents: mockDocuments,
    });

    const result = await getRecentAppointmentList();

    expect(databases.listDocuments).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_APPOINTMENT_COLLECTION_ID,
      orderByCreatedAt
    );

    expect(result).toEqual(
      parseStringify({
        totalCount,
        cancelledCount: cancelledAppointment.length,
        pendingCount: pendingAppointment.length,
        scheduledCount: scheduledAppointment.length,
        documents: mockDocuments,
      })
    );
  });
});

describe('updateAppointment', () => {
  const mockAppointment = createMockExistingAppointmentData();
  const mockUpdateAppointment = createMockUpdateAppointmentData();

  it('Should update the appointment data successfully', async () => {
    (databases.updateDocument as jest.Mock).mockResolvedValueOnce({
      ...mockAppointment,
      ...mockUpdateAppointment.appointment,
    });

    const result = await updateAppointment(mockUpdateAppointment);

    expect(databases.updateDocument).toHaveBeenCalledWith(
      MOCK_DATABASE_ID,
      MOCK_APPOINTMENT_COLLECTION_ID,
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
