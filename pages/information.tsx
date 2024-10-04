import { useQuery, gql } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header, UserInfo } from "@/src/component/Header";
import Footer from "@/src/component/Footer";
import { ImageDetailsModal } from "@/src/component/modal/ImageDetailsModal";
import LoginModal from "@/src/component/modal/LoginModal";
import CharacterGrid from "@/src/component/InformationPage/CharacterGrid";
import InformationPageSkeleton from "@/src/component/InformationPage/InformationPageSkeleton";
import InformationPageError from "@/src/component/InformationPage/InformationPageError";
import { GET_CHARACTERS } from "@/src/apollo/query/getCharacters";
import type {
  GetCharacters,
  GetCharactersQueryVariables,
} from "@/src/apollo/types/types";

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
  // TODO
  const [name, setName] = useState("rick");
  const [page, setPage] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      setUserInfo(storedUserInfo ? JSON.parse(storedUserInfo) : undefined);
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;

    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      closeLoginModal();
    } else {
      openLoginModal();
    }
  }, [userInfo, isInitialLoad, openLoginModal, closeLoginModal]);

  const { data, loading, error } = useQuery<
    GetCharacters,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { name, page },
    skip: !userInfo,
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

      {characters && (
        <CharacterGrid
          characters={characters}
          onCharacterClick={handleClickItem}
        />
      )}

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
        }}
      />
    </>
  );
};

export default InformationPage;
