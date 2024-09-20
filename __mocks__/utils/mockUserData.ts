export const mockUserId = 'userId';

export const createMockNewUserData = (): CreateUserParams => {
  return {
    email: 'mock@mail.com',
    name: 'Mock Name',
    phone: '+33 1 23 45 67 89',
  };
};

export const createMockExistingUserData = () => {
  return {
    $id: 'userId',
    name: 'Mock Name',
    email: 'mock@mail.com',
    phone: '+33 1 23 45 67 89',
  };
};
