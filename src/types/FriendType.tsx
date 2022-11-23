export interface Friend {
	find(arg0: (t: any) => boolean): unknown
	readonly id: string
	readonly name: string
	readonly image: string
	readonly nick: string
}
