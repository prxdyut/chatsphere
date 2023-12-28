import Header from "../components/Header";
import Layout from "../layout";
import { UserProfile } from "@clerk/clerk-react";

export default function Settings() {
  return (
    <Layout>
      <div className="col-span-2 flex flex-col gap-2 max-h-screen settings-page overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"Settings"} />
        </div>{" "}
        <UserProfile />
      </div>
    </Layout>
  );
}
