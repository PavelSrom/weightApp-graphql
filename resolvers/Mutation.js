const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const getUserId = require('../utils/getUserId')

const Mutation = {
	createUser: async (parent, { name, email, password }, { prisma }) => {
		if (password.length < 6) throw new Error('Password at least 6 characters')

		const userExists = await prisma.user({ email })
		if (userExists) throw new Error('User with this email already exists')

		password = await bcrypt.hash(password, 8)
		const user = await prisma.createUser({ name, email, password })

		const token = jwt.sign({ id: user.id }, 'pavelskisecret', { expiresIn: 3600 })

		return { user, token }
	},
	loginUser: async (parent, { email, password }, { prisma }) => {
		const user = await prisma.user({ email })
		if (!user) throw new Error('Invalid email')

		const match = await bcrypt.compare(password, user.password)
		if (!match) throw new Error('Invalid password')

		const token = jwt.sign({ id: user.id }, 'pavelskisecret', { expiresIn: 3600 })

		return { user, token }
	},
	createProfile: (parent, { data }, { prisma, request }) => {
		const userId = getUserId(request)

		return prisma.createProfile({
			...data,
			user: {
				connect: {
					id: userId
				}
			}
		})
	},
	updateProfile: async (parent, { data }, { prisma, request }) => {
		const userId = getUserId(request)
		const profile = await prisma.user({ id: userId }).profile()

		if (data.chosenExercise) {
			return prisma.updateProfile({
				data: {
					...data,
					chosenExercise: {
						connect: {
							id: data.chosenExercise
						}
					}
				},
				where: {
					id: profile.id
				}
			})
		}

		return prisma.updateProfile({
			data,
			where: {
				id: profile.id
			}
		})
	},
	deleteUser: (parent, args, { prisma, request }) => {
		const userId = getUserId(request)

		return prisma.deleteUser({ id: userId })
	},
	createLog: async (parent, { weight, date }, { prisma, request }) => {
		const userId = getUserId(request)
		const profile = await prisma.user({ id: userId }).profile()

		return prisma.createLog({
			weight,
			date,
			user: {
				connect: {
					id: profile.id
				}
			}
		})
	},
	updateLog: (parent, { id, ...rest }, { prisma, request }) => {
		const userId = getUserId(request)

		return prisma.updateLog({
			data: {
				...rest
			},
			where: {
				id
			}
		})
	}
}

module.exports = Mutation