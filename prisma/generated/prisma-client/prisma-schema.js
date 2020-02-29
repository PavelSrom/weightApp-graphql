module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateExercise {
  count: Int!
}

type AggregateLog {
  count: Int!
}

type AggregateProfile {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Exercise {
  id: ID!
  name: String!
  kcalHour: Int!
}

type ExerciseConnection {
  pageInfo: PageInfo!
  edges: [ExerciseEdge]!
  aggregate: AggregateExercise!
}

input ExerciseCreateInput {
  id: ID
  name: String!
  kcalHour: Int!
}

input ExerciseCreateOneInput {
  create: ExerciseCreateInput
  connect: ExerciseWhereUniqueInput
}

type ExerciseEdge {
  node: Exercise!
  cursor: String!
}

enum ExerciseOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  kcalHour_ASC
  kcalHour_DESC
}

type ExercisePreviousValues {
  id: ID!
  name: String!
  kcalHour: Int!
}

type ExerciseSubscriptionPayload {
  mutation: MutationType!
  node: Exercise
  updatedFields: [String!]
  previousValues: ExercisePreviousValues
}

input ExerciseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ExerciseWhereInput
  AND: [ExerciseSubscriptionWhereInput!]
  OR: [ExerciseSubscriptionWhereInput!]
  NOT: [ExerciseSubscriptionWhereInput!]
}

input ExerciseUpdateDataInput {
  name: String
  kcalHour: Int
}

input ExerciseUpdateInput {
  name: String
  kcalHour: Int
}

input ExerciseUpdateManyMutationInput {
  name: String
  kcalHour: Int
}

input ExerciseUpdateOneInput {
  create: ExerciseCreateInput
  update: ExerciseUpdateDataInput
  upsert: ExerciseUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ExerciseWhereUniqueInput
}

input ExerciseUpsertNestedInput {
  update: ExerciseUpdateDataInput!
  create: ExerciseCreateInput!
}

input ExerciseWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  kcalHour: Int
  kcalHour_not: Int
  kcalHour_in: [Int!]
  kcalHour_not_in: [Int!]
  kcalHour_lt: Int
  kcalHour_lte: Int
  kcalHour_gt: Int
  kcalHour_gte: Int
  AND: [ExerciseWhereInput!]
  OR: [ExerciseWhereInput!]
  NOT: [ExerciseWhereInput!]
}

input ExerciseWhereUniqueInput {
  id: ID
}

type Log {
  id: ID!
  user: Profile!
  weight: Float!
  date: String!
}

type LogConnection {
  pageInfo: PageInfo!
  edges: [LogEdge]!
  aggregate: AggregateLog!
}

input LogCreateInput {
  id: ID
  user: ProfileCreateOneWithoutLogsInput!
  weight: Float!
  date: String!
}

input LogCreateManyWithoutUserInput {
  create: [LogCreateWithoutUserInput!]
  connect: [LogWhereUniqueInput!]
}

input LogCreateWithoutUserInput {
  id: ID
  weight: Float!
  date: String!
}

type LogEdge {
  node: Log!
  cursor: String!
}

enum LogOrderByInput {
  id_ASC
  id_DESC
  weight_ASC
  weight_DESC
  date_ASC
  date_DESC
}

type LogPreviousValues {
  id: ID!
  weight: Float!
  date: String!
}

input LogScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  weight: Float
  weight_not: Float
  weight_in: [Float!]
  weight_not_in: [Float!]
  weight_lt: Float
  weight_lte: Float
  weight_gt: Float
  weight_gte: Float
  date: String
  date_not: String
  date_in: [String!]
  date_not_in: [String!]
  date_lt: String
  date_lte: String
  date_gt: String
  date_gte: String
  date_contains: String
  date_not_contains: String
  date_starts_with: String
  date_not_starts_with: String
  date_ends_with: String
  date_not_ends_with: String
  AND: [LogScalarWhereInput!]
  OR: [LogScalarWhereInput!]
  NOT: [LogScalarWhereInput!]
}

type LogSubscriptionPayload {
  mutation: MutationType!
  node: Log
  updatedFields: [String!]
  previousValues: LogPreviousValues
}

input LogSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LogWhereInput
  AND: [LogSubscriptionWhereInput!]
  OR: [LogSubscriptionWhereInput!]
  NOT: [LogSubscriptionWhereInput!]
}

input LogUpdateInput {
  user: ProfileUpdateOneRequiredWithoutLogsInput
  weight: Float
  date: String
}

input LogUpdateManyDataInput {
  weight: Float
  date: String
}

input LogUpdateManyMutationInput {
  weight: Float
  date: String
}

input LogUpdateManyWithoutUserInput {
  create: [LogCreateWithoutUserInput!]
  delete: [LogWhereUniqueInput!]
  connect: [LogWhereUniqueInput!]
  set: [LogWhereUniqueInput!]
  disconnect: [LogWhereUniqueInput!]
  update: [LogUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [LogUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [LogScalarWhereInput!]
  updateMany: [LogUpdateManyWithWhereNestedInput!]
}

input LogUpdateManyWithWhereNestedInput {
  where: LogScalarWhereInput!
  data: LogUpdateManyDataInput!
}

input LogUpdateWithoutUserDataInput {
  weight: Float
  date: String
}

input LogUpdateWithWhereUniqueWithoutUserInput {
  where: LogWhereUniqueInput!
  data: LogUpdateWithoutUserDataInput!
}

input LogUpsertWithWhereUniqueWithoutUserInput {
  where: LogWhereUniqueInput!
  update: LogUpdateWithoutUserDataInput!
  create: LogCreateWithoutUserInput!
}

input LogWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: ProfileWhereInput
  weight: Float
  weight_not: Float
  weight_in: [Float!]
  weight_not_in: [Float!]
  weight_lt: Float
  weight_lte: Float
  weight_gt: Float
  weight_gte: Float
  date: String
  date_not: String
  date_in: [String!]
  date_not_in: [String!]
  date_lt: String
  date_lte: String
  date_gt: String
  date_gte: String
  date_contains: String
  date_not_contains: String
  date_starts_with: String
  date_not_starts_with: String
  date_ends_with: String
  date_not_ends_with: String
  AND: [LogWhereInput!]
  OR: [LogWhereInput!]
  NOT: [LogWhereInput!]
}

input LogWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createExercise(data: ExerciseCreateInput!): Exercise!
  updateExercise(data: ExerciseUpdateInput!, where: ExerciseWhereUniqueInput!): Exercise
  updateManyExercises(data: ExerciseUpdateManyMutationInput!, where: ExerciseWhereInput): BatchPayload!
  upsertExercise(where: ExerciseWhereUniqueInput!, create: ExerciseCreateInput!, update: ExerciseUpdateInput!): Exercise!
  deleteExercise(where: ExerciseWhereUniqueInput!): Exercise
  deleteManyExercises(where: ExerciseWhereInput): BatchPayload!
  createLog(data: LogCreateInput!): Log!
  updateLog(data: LogUpdateInput!, where: LogWhereUniqueInput!): Log
  updateManyLogs(data: LogUpdateManyMutationInput!, where: LogWhereInput): BatchPayload!
  upsertLog(where: LogWhereUniqueInput!, create: LogCreateInput!, update: LogUpdateInput!): Log!
  deleteLog(where: LogWhereUniqueInput!): Log
  deleteManyLogs(where: LogWhereInput): BatchPayload!
  createProfile(data: ProfileCreateInput!): Profile!
  updateProfile(data: ProfileUpdateInput!, where: ProfileWhereUniqueInput!): Profile
  updateManyProfiles(data: ProfileUpdateManyMutationInput!, where: ProfileWhereInput): BatchPayload!
  upsertProfile(where: ProfileWhereUniqueInput!, create: ProfileCreateInput!, update: ProfileUpdateInput!): Profile!
  deleteProfile(where: ProfileWhereUniqueInput!): Profile
  deleteManyProfiles(where: ProfileWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Profile {
  id: ID!
  user: User!
  desiredWeight: Int!
  height: Int!
  kcalIntake: Int!
  logs(where: LogWhereInput, orderBy: LogOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Log!]
  chosenExercise: Exercise
}

type ProfileConnection {
  pageInfo: PageInfo!
  edges: [ProfileEdge]!
  aggregate: AggregateProfile!
}

input ProfileCreateInput {
  id: ID
  user: UserCreateOneWithoutProfileInput!
  desiredWeight: Int!
  height: Int!
  kcalIntake: Int!
  logs: LogCreateManyWithoutUserInput
  chosenExercise: ExerciseCreateOneInput
}

input ProfileCreateOneWithoutLogsInput {
  create: ProfileCreateWithoutLogsInput
  connect: ProfileWhereUniqueInput
}

input ProfileCreateOneWithoutUserInput {
  create: ProfileCreateWithoutUserInput
  connect: ProfileWhereUniqueInput
}

input ProfileCreateWithoutLogsInput {
  id: ID
  user: UserCreateOneWithoutProfileInput!
  desiredWeight: Int!
  height: Int!
  kcalIntake: Int!
  chosenExercise: ExerciseCreateOneInput
}

input ProfileCreateWithoutUserInput {
  id: ID
  desiredWeight: Int!
  height: Int!
  kcalIntake: Int!
  logs: LogCreateManyWithoutUserInput
  chosenExercise: ExerciseCreateOneInput
}

type ProfileEdge {
  node: Profile!
  cursor: String!
}

enum ProfileOrderByInput {
  id_ASC
  id_DESC
  desiredWeight_ASC
  desiredWeight_DESC
  height_ASC
  height_DESC
  kcalIntake_ASC
  kcalIntake_DESC
}

type ProfilePreviousValues {
  id: ID!
  desiredWeight: Int!
  height: Int!
  kcalIntake: Int!
}

type ProfileSubscriptionPayload {
  mutation: MutationType!
  node: Profile
  updatedFields: [String!]
  previousValues: ProfilePreviousValues
}

input ProfileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProfileWhereInput
  AND: [ProfileSubscriptionWhereInput!]
  OR: [ProfileSubscriptionWhereInput!]
  NOT: [ProfileSubscriptionWhereInput!]
}

input ProfileUpdateInput {
  user: UserUpdateOneRequiredWithoutProfileInput
  desiredWeight: Int
  height: Int
  kcalIntake: Int
  logs: LogUpdateManyWithoutUserInput
  chosenExercise: ExerciseUpdateOneInput
}

input ProfileUpdateManyMutationInput {
  desiredWeight: Int
  height: Int
  kcalIntake: Int
}

input ProfileUpdateOneRequiredWithoutLogsInput {
  create: ProfileCreateWithoutLogsInput
  update: ProfileUpdateWithoutLogsDataInput
  upsert: ProfileUpsertWithoutLogsInput
  connect: ProfileWhereUniqueInput
}

input ProfileUpdateOneWithoutUserInput {
  create: ProfileCreateWithoutUserInput
  update: ProfileUpdateWithoutUserDataInput
  upsert: ProfileUpsertWithoutUserInput
  delete: Boolean
  disconnect: Boolean
  connect: ProfileWhereUniqueInput
}

input ProfileUpdateWithoutLogsDataInput {
  user: UserUpdateOneRequiredWithoutProfileInput
  desiredWeight: Int
  height: Int
  kcalIntake: Int
  chosenExercise: ExerciseUpdateOneInput
}

input ProfileUpdateWithoutUserDataInput {
  desiredWeight: Int
  height: Int
  kcalIntake: Int
  logs: LogUpdateManyWithoutUserInput
  chosenExercise: ExerciseUpdateOneInput
}

input ProfileUpsertWithoutLogsInput {
  update: ProfileUpdateWithoutLogsDataInput!
  create: ProfileCreateWithoutLogsInput!
}

input ProfileUpsertWithoutUserInput {
  update: ProfileUpdateWithoutUserDataInput!
  create: ProfileCreateWithoutUserInput!
}

input ProfileWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  desiredWeight: Int
  desiredWeight_not: Int
  desiredWeight_in: [Int!]
  desiredWeight_not_in: [Int!]
  desiredWeight_lt: Int
  desiredWeight_lte: Int
  desiredWeight_gt: Int
  desiredWeight_gte: Int
  height: Int
  height_not: Int
  height_in: [Int!]
  height_not_in: [Int!]
  height_lt: Int
  height_lte: Int
  height_gt: Int
  height_gte: Int
  kcalIntake: Int
  kcalIntake_not: Int
  kcalIntake_in: [Int!]
  kcalIntake_not_in: [Int!]
  kcalIntake_lt: Int
  kcalIntake_lte: Int
  kcalIntake_gt: Int
  kcalIntake_gte: Int
  logs_every: LogWhereInput
  logs_some: LogWhereInput
  logs_none: LogWhereInput
  chosenExercise: ExerciseWhereInput
  AND: [ProfileWhereInput!]
  OR: [ProfileWhereInput!]
  NOT: [ProfileWhereInput!]
}

input ProfileWhereUniqueInput {
  id: ID
}

type Query {
  exercise(where: ExerciseWhereUniqueInput!): Exercise
  exercises(where: ExerciseWhereInput, orderBy: ExerciseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Exercise]!
  exercisesConnection(where: ExerciseWhereInput, orderBy: ExerciseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExerciseConnection!
  log(where: LogWhereUniqueInput!): Log
  logs(where: LogWhereInput, orderBy: LogOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Log]!
  logsConnection(where: LogWhereInput, orderBy: LogOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LogConnection!
  profile(where: ProfileWhereUniqueInput!): Profile
  profiles(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Profile]!
  profilesConnection(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProfileConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  exercise(where: ExerciseSubscriptionWhereInput): ExerciseSubscriptionPayload
  log(where: LogSubscriptionWhereInput): LogSubscriptionPayload
  profile(where: ProfileSubscriptionWhereInput): ProfileSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  profile: Profile
  name: String!
  email: String!
  password: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  profile: ProfileCreateOneWithoutUserInput
  name: String!
  email: String!
  password: String!
}

input UserCreateOneWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutProfileInput {
  id: ID
  name: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  profile: ProfileUpdateOneWithoutUserInput
  name: String
  email: String
  password: String
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
}

input UserUpdateOneRequiredWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  update: UserUpdateWithoutProfileDataInput
  upsert: UserUpsertWithoutProfileInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutProfileDataInput {
  name: String
  email: String
  password: String
}

input UserUpsertWithoutProfileInput {
  update: UserUpdateWithoutProfileDataInput!
  create: UserCreateWithoutProfileInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  profile: ProfileWhereInput
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    