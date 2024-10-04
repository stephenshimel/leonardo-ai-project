import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header, UserInfo } from "@/src/component/Header";
import Footer from "@/src/component/Footer";
import LoginModal from "@/src/component/modal/LoginModal";
import CharacterGrid from "@/src/component/InformationPage/CharacterGrid";

const InformationPage = () => {
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

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

  return (
    <>
      <Header
        userInfo={userInfo}
        onChangeUser={() => {
          openLoginModal();
        }}
      ></Header>

      <CharacterGrid characterName={name} page={page} />

      <Footer page={page} setPage={setPage} />

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

// TODO: unit tests
// TODO: cypress tests
// TODO: Readme file
// TODO: accessibility,

