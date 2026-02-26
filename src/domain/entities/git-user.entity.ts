import { GitEntity } from '@models/git-entity.model';
import { AuthedGitUser } from '@models/authed-git-user.model';
import { GitUserInfo } from '@models/git-user-info.model';

export interface GitUser extends GitEntity<number>, AuthedGitUser, GitUserInfo {

	login: string,
	avatar_url: string,
	gravatar_id: string | null,
	followers_url: string,
	following_url: string,
	gists_url: string,
	starred_url: string,
	subscriptions_url: string,
	organizations_url: string,
	repos_url: string,
	events_url: string,
	received_events_url: string,
	type: 'User' | 'Organization' | 'Bot',
	user_view_type?: 'public' | 'private',
	site_admin: boolean

}