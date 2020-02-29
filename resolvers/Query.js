const getUserId = require('../utils/getUserId')

const Query = {
  user: (parent, args, { prisma, request }) => {
    const id = getUserId(request)

    return prisma.user({ id })
  },
  profile: (parent, args, { prisma, request }) => {
    const id = getUserId(request)

    return prisma.user({ id }).profile()
  },
  logs: (parent, args, { prisma, request }) => {
    const id = getUserId(request)

    return prisma.user({ id }).profile().logs()
  },
  exercises: (parent, args, { prisma, request }) => {
    const userId = getUserId(request)

    return prisma.exercises()
  },
  verifyToken: (parent, args, { request }) => {
    const id = getUserId(request)

    return true
  }
}

module.exports = Query