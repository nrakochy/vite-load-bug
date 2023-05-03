import axios from "axios";

type Token = {
  token: string;
};

// TODO: Implement AxiosInstance instead, in order to follow DRY in redux slices

export function isToken(object: unknown): object is Token {
  if (object !== null && typeof object === "object") {
    return Object.hasOwn(object, "token");
  }

  return false;
}

export async function getToken(url: string, signal: AbortSignal): Promise<Token | string> {
  try {
    const response = await axios.get<Token>(url, { signal });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      return "Failure to refresh token";
    }
    return error.message;
  }
}
