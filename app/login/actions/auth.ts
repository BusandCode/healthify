"use server"

import { signIn } from "../../auth"

export async function handleGoogleSignIn() {
  await signIn("google", { redirectTo: "/home-page" })
}