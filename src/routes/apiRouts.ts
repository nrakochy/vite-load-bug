const host = "https://api.wisey.app";
const version = "api/v1";

export const apiRouts = {
  GET_COURSES_PREVIEW_URL: `${host}/${version}/core/preview-courses`,
  GET_TOKEN_URL: `${host}/${version}/auth/anonymous?platform=subscriptions`,
} as const;
