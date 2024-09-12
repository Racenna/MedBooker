import Image from 'next/image';
import PatientForm from '@/components/forms/PatientForm';
import Link from 'next/link';
import PasskeyModal from '@/components/PasskeyModal';
import Logo from '@/components/Logo';

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Logo className="mb-12" />

          <PatientForm />

          <div className="copyright mt-20 flex justify-between">
            <p>© 2024 MedBook</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="patient"
        width={1200}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
