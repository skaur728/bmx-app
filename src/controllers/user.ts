import User from '@/models/User'
import type { IUser } from '@/models/User'

// call .exec() on queries to convert to promise

export const createUser = ({ firstName, lastName }: IUser): Promise<IUser> =>
  User.create({ firstName, lastName })

export const getUser = ({ id }: { id: string }): Promise<IUser> =>
  User.findById(id).lean().exec()

export const getUsers = (): Promise<IUser[]> =>
  User.find({}).lean().exec() as Promise<IUser[]>

export const updateUser = ({
  id,
  firstName,
  lastName,
}: IUser & { id: string }): Promise<IUser> =>
  User.findByIdAndUpdate(
    id,
    { firstName, lastName },
    { returnDocument: 'after' }
  )
    .lean()
    .exec()

export const deleteUser = ({ id }: { id: string }): Promise<IUser> =>
  User.findByIdAndDelete(id).lean().exec()
