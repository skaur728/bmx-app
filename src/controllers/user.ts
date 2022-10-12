import User from '@/models/User'

import type { IUserDocument, LeanedUser } from '@/models/User'

// call .exec() on queries to convert to promise

export const getUser = <T extends LeanOption>(
  id: ObjectId,
  options = {} as T
): LeanOptionResult<T, LeanedUser | null, IUserDocument | null> =>
  User.findById(id).lean(options?.lean).exec() as any

// Get exactly one user by email
export const getUserByEmail = ({
  email,
}: {
  email: string
}): Promise<LeanedUser | null> => User.findOne({ email }).lean().exec()

export const getUsers = (): Promise<IUser[]> =>
  User.find({}).lean().exec() as Promise<IUser[]>

export const updateUser = ({
  id,
  firstName,
  lastName,
}: Partial<IUser> & { id: string }): Promise<LeanedUser | null> =>
  User.findByIdAndUpdate(
    id,
    { firstName, lastName },
    { returnDocument: 'after' }
  )
    .lean()
    .exec()

export const deleteUser = ({
  id,
}: {
  id: string
}): Promise<LeanedUser | null> => User.findByIdAndDelete(id).lean().exec()
