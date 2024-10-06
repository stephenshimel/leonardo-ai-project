import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Footer } from "@/src/component/Footer";
import { Header, UserInfo } from "@/src/component/Header";
import LoginModal from "@/src/component/modal/LoginModal";
import { CharacterGrid } from "@/src/component/InformationPage/CharacterGrid";

const InformationPage = () => {
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const [page, setPage] = useState<number>();
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
    } else {
      openLoginModal(); // when user is not logged in, always show login modal in order to block the access to the info page
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

      <CharacterGrid page={page} userInfo={userInfo} />

      <Footer page={page} setPage={setPage} />

      <LoginModal
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default InformationPage;

// TODO: cypress tests
// TODO: Readme file
// TODO: accessibility,
// TODO: add a bit more code comments
