import { redirect } from "next/navigation";

import { getCurrentUser } from "~/services/user";
import UsernameForm from "~/components/username-form";
import PersonaCard from "~/components/persona-card";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/login");
  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="grid items-start gap-8">
        <h2 className="text-3xl font-bold md:text-4xl">Settings</h2>
        <PersonaCard currentUser={currentUser} />
        <UsernameForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default SettingsPage;
