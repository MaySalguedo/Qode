
export interface AuthedGitUser {

	private_gists: number,
	total_private_repos: number,
	owned_private_repos: number,
	disk_usage: number,
	collaborators: number,
	two_factor_authentication: boolean,
	plan: {

		name: string,
		space: number,
		collaborators: number,
		private_repos: number

	}

}