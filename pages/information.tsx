import { useQuery, gql } from "@apollo/client";
import { Box, Grid, Text, useDisclosure, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header, UserInfo } from "@/src/component/Header";
import Footer from "@/src/component/Footer";
import { ImageDetailsModal } from "@/src/component/modal/ImageDetailsModal";
import LoginModal from "@/src/component/modal/LoginModal";
import CharacterGrid from "@/src/component/InformationPage/CharacterGrid";
import InformationPageSkeleton from "@/src/component/InformationPage/InformationPageSkeleton";
import InformationPageError from "@/src/component/InformationPage/InformationPageError";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        name
        image
      }
    }
  }
`;

const InformationPage = () => {
  const {
    isOpen: isImageDetailsModalOpen,
    onOpen: openImageDetailsModal,
    onClose: closeImageDetailsModal,
  } = useDisclosure();

  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [name, setName] = useState("rick");
  const [page, setPage] = useState(1);

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : undefined;
    }
    return undefined;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }else{
      openLoginModal()
    }
  }, [userInfo]);

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { name, page },
  });

  if (loading) return <InformationPageSkeleton />;
  if (error) return <InformationPageError error={error} />;

  const handleClickItem = (item: number) => {
    setSelectedItem(item);
    openImageDetailsModal();
  };

  const characters = data?.characters.results;

  return (
    <>
      <Header
        userInfo={userInfo}
        onChangeUser={() => {
          openLoginModal();
        }}
      ></Header>

      <CharacterGrid
        characters={characters}
        onCharacterClick={handleClickItem}
      />

      <Footer page={page} setPage={setPage} />

      {selectedItem !== null && characters && (
        <ImageDetailsModal
          isOpen={isImageDetailsModalOpen}
          onClose={closeImageDetailsModal}
          character={characters[selectedItem]}
        />
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSubmit={(data: UserInfo) => {
          setUserInfo(data);
          closeLoginModal();
        }}
      />
    </>
  );
};

export default InformationPage;
