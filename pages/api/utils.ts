import { GenericUser } from "@/types";
import { baseURL } from "./constants";

export const getUserDetails = async (): Promise<GenericUser> => {
  const urlForMeCall = `${baseURL}/me`;
  const profileResponse = await fetch(urlForMeCall, {
    headers: {
      Authorization: `Bearer ${process.env.UNSPLASH_ACCESSTOKEN}`
    }
  });

  if (!profileResponse.ok) {
    throw new Error(
      `Error fetching profile details: ${profileResponse.statusText}`
    );
  }

  const profile: GenericUser = await profileResponse.json();
  console.log("##### ", { profile });
  return profile;
};

export function processValue(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value.trim(); // Sanitize input by trimming whitespace.
  } else if (Array.isArray(value)) {
    return value.map((v) => v.trim()).join(","); // Join arrays with commas.
  }
  return ""; // Return an empty string for undefined or invalid input.
}
