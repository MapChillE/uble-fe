"use client";
import useFeedbackModalStore from "@/store/useFeedbackModalStore";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";
import useConfirmModalStore from "@/store/useConfirmModalStore";
import FeedbackModal from "@/components/modal/FeedbackModal";
import ProfileEditModal from "@/components/modal/ProfileEditModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Fragment, useEffect } from "react";

const ModalContainer = () => {
  const { isOpen: isFeedbackOpen, close: feedbackClose } = useFeedbackModalStore();
  const { isOpen: isProfileEditOpen, close: profileClose } = useProfileEditModalStore();
  const { isOpen: isConfirmOpen } = useConfirmModalStore();

  useEffect(() => {
    feedbackClose();
    profileClose();
  }, []);

  return (
    <Fragment>
      {isFeedbackOpen && <FeedbackModal />}
      {isProfileEditOpen && <ProfileEditModal />}
      {isConfirmOpen && <ConfirmModal />}
    </Fragment>
  );
};

export default ModalContainer;
