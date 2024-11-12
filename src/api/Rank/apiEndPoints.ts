

export const addRankEndpoint = () =>(`/api/ranks`);

export const editRankEndpoint = (rankId: string) =>
 (`/api/ranks/${rankId}`);

export const getRankEndpoint = () =>(`/api/ranks`);

export const getRankDetailsEndpoint = (rankId: string) =>
 (`/api/ranks/${rankId}`);

export const deleteRankEndpoint = (rankId: string) =>
 (`/api/ranks/${rankId}`);

export const getRankBadgeDetailsEndpoint = (partnerId: string) =>
 (`/api/ranks/badge/${partnerId}`);
