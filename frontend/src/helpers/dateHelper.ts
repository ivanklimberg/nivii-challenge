export const displayCreatedAt = (createdAt: string) =>
  `${new Date(createdAt).toLocaleDateString()} ${new Date(
    createdAt
  ).toLocaleTimeString()}`;
