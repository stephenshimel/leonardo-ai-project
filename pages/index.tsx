import { GetServerSideProps } from "next";

// redirect to information page
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/information",
      permanent: true,
    },
  };
};

const HomePage = () => {
  return null;
};

export default HomePage;
