import { auth } from "@/auth";

const Settings = async () => {
  const session = await auth();

  return <div className="p-8">{JSON.stringify(session)}</div>;
};

export default Settings;
