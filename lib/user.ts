import { db } from "./db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};
