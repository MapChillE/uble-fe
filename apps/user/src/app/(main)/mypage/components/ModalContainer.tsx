"use client"
import useFeedbackModalStore from "@/store/useFeedbackModalStore";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";
import FeedbackModal from '@/components/modal/FeedbackModal';
import ProfileEditModal from '@/components/modal/ProfileEditModal';
import { Fragment } from "react";

const ModalContainer = () => {
  const { isOpen: isFeedbackOpen } = useFeedbackModalStore();
  const { isOpen: isProfileEditOpen } = useProfileEditModalStore();
  return (
    <Fragment>
      {isFeedbackOpen && <FeedbackModal />}
      {isProfileEditOpen && <ProfileEditModal />}
    </Fragment>
  );
};

export default ModalContainer;