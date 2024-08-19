'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import Image from 'next/image';
import AppointmentModal from '../AppointmentModal';
import { Appointment } from '@/types/appwrite.types';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// TODO - change type
export type Columns = {
  status: Status;
  patient: any;
  schedule: any;
  primaryPhysician: any;
  userId: any;
};

export const columns: ColumnDef<Columns>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'appointment',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image ?? 'todo - placeholder image'}
            width={100}
            height={100}
            className="size-8"
            alt={doctor?.name ?? 'doctor'}
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data as Appointment}
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data as Appointment}
          />
        </div>
      );
    },
  },
];
