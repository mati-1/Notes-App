export interface UserData {
	id: string
	readonly name: string
	readonly surname: string
	readonly email: string
	readonly password: string
	readonly token: string
	readonly returnSecureToken: boolean
	readonly created: string
	readonly lastLogin: string
	readonly nick: string
	readonly image: string
	readonly friends: string[]
	readonly blockedUsers: string[]
	readonly description: string
}
