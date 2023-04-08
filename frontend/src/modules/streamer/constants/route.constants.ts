export const StreamerRouteConstants = {
  profile: () => '/profile/streamer',
  donations: () => `${StreamerRouteConstants.profile()}/donations`,
  fallback: () => '*',
}
