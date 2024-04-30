import { auth, signOut } from "@/auth";

const Settings = async () => {
  const session = await auth();

  return (
    <div className="p-8">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Settings;
