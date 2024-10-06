import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Footer } from "@/src/component/Footer";
import { Header } from "@/src/component/Header";
import { UserInfo } from "@/src/component/types";
import { CharacterGrid } from "@/src/component/InformationPage/CharacterGrid";
import { LoginModal } from "@/src/component/modal/LoginModal";
import { GET_CHARACTERS } from "@/src/apollo/query/getCharacters";
import type {
  GetCharacters,
  GetCharactersQueryVariables,
} from "@/src/apollo/types/types";
import {
  getUserInfoFromLocalStorage,
  isValidPageNumber,
  setUserInfoInLocalStorage,
} from "@/src/util/util";

const InformationPage = () => {
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const [page, setPage] = useState<number>(NaN);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // loading and error UI are handled in CharacterGrid
  const { data, loading, error } = useQuery<
    GetCharacters,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { name: "rick", page: page },
    skip: !userInfo || !isValidPageNumber(page),
  });

  // get user info from local storage
  useEffect(() => {
    setUserInfo(getUserInfoFromLocalStorage());
    setIsInitialLoad(false);
  }, []);

  // save user info to local storage
  useEffect(() => {
    if (isInitialLoad) return;

    if (userInfo) {
      setUserInfoInLocalStorage(userInfo);
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

      <CharacterGrid
        characters={data?.characters.results || []}
        isLoading={loading}
        isError={!!error}
      />

      <Footer
        page={page}
        setPage={setPage}
        totalPages={data?.characters.info.pages || 0}
      />

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
