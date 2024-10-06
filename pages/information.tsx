import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import { Footer } from "@/src/component/Footer";
import { Header } from "@/src/component/Header";
import { UserInfo } from "@/src/component/types";
import { CharacterGrid } from "@/src/component/InformationPage/CharacterGrid";
import { LoginModal } from "@/src/component/modal/LoginModal";

const InformationPage = () => {
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const [page, setPage] = useState<number>();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // get user info from local storage
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    setUserInfo(storedUserInfo ? JSON.parse(storedUserInfo) : undefined);
    setIsInitialLoad(false);
  }, []);

  // save user info to local storage
  useEffect(() => {
    if (isInitialLoad) return;

    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      openLoginModal(); // when user is not logged in, always show login modal in order to block the user from accessing the other pages
    }
  }, [userInfo, isInitialLoad, openLoginModal, closeLoginModal]);

  const handleChangeUser = useCallback(() => {
    openLoginModal();
  }, [openLoginModal]);

  return (
    <>
      <Header userInfo={userInfo} onChangeUser={handleChangeUser}></Header>

      <CharacterGrid page={page} hasUserInfo={!!userInfo} />

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
