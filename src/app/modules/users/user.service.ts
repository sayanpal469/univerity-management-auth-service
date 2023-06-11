import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { generateUserId } from './user.utils';
import { Iuser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: Iuser): Promise<Iuser | null> => {
  // auto generated incremental id
  const id = await generateUserId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
