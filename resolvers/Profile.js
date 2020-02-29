const Profile = {
  user: (parent, args, { prisma }) => {
    return prisma.profile({ id: parent.id }).user()
  },
  logs: (parent, args, { prisma }) => {
    return prisma.profile({ id: parent.id }).logs()
  },
  chosenExercise: (parent, args, { prisma }) => {
    return prisma.profile({ id: parent.id }).chosenExercise()
  }
}

module.exports = Profile