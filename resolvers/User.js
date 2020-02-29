const User = {
  profile: (parent, args, { prisma }) => {
    return prisma.user({ id: parent.id }).profile()
  }
}

module.exports = User