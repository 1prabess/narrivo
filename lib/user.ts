import { db } from "./db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.log("Error finding the user in getUserByEmail.");
    return null;
  }
};
