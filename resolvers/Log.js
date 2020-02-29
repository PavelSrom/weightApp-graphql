const Log = {
  user: (parent, args, { prisma }) => {
    return prisma.log({ id: parent.id }).user()
  }
}

module.exports = Log