import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';

import * as Sentry from '@sentry/nextjs';
import Logo from '@/components/Logo';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  Sentry.metrics.set('user_view_register', user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Logo className="mb-12" />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 MedBook</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        width={800}
        height={2200}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
