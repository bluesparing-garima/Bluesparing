

export const addBrokerEndpoint = () =>(`/api/broker`);

export const editBrokerEndpoint = (brokerId: string) =>
 (`/api/broker/${brokerId}`);

export const getBrokerEndpoint = () =>(`/api/broker`);

export const getBrokerDetailsEndpoint = (brokerId: string) =>
 (`/api/broker/${brokerId}`);

export const deleteBrokerEndpoint = (brokerId: string) =>
 (`/api/broker/${brokerId}`);