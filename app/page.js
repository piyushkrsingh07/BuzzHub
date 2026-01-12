// app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/signIn"); // path to your signin page
}
