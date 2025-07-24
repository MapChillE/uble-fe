"use client";
import useFeedbackModalStore from "@/store/useFeedbackModalStore";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";
import FeedbackModal from "@/components/modal/FeedbackModal";
import ProfileEditModal from "@/components/modal/ProfileEditModal";
import { Fragment, useEffect } from "react";

const ModalContainer = () => {
  const { isOpen: isFeedbackOpen, close: feedbackClose } = useFeedbackModalStore();
  const { isOpen: isProfileEditOpen, close: profileClose } = useProfileEditModalStore();
  useEffect(() => {
    feedbackClose();
    profileClose();
  }, []);
  return (
    <Fragment>
      {isFeedbackOpen && <FeedbackModal />}
      {isProfileEditOpen && <ProfileEditModal />}
    </Fragment>
  );
};

export default ModalContainer;
