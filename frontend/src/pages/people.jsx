import ChatsSearch from "../components/ChatsSearch";
import Header from "../components/Header";
import Layout from "../layout";
import PeopleList from "../components/PeopleList";
import PeopleNew from "../components/PeopleNew";

export default function People() {
  return (
    <Layout>
      <div className="  col-span-2 h-screen overflow-y-auto overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"People"} />
          <ChatsSearch />
        </div>
        <PeopleNew />
        <PeopleList />
        <div className=" h-16 max-lg:w-screen  max-lg:col-span-7"></div>
      </div>
    </Layout>
  );
}
