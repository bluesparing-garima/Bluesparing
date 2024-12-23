
export const getSubscriptionEndpoint = () => (`/api/subscriptions`);

export const getSubscriptionByIdEndpoint = (subscriptionId: string) =>
  (`/api/subscriptions/${subscriptionId}`);

export const getAdminSubscription = (tId: string) =>
  (`/api/transaction/${tId}`);


