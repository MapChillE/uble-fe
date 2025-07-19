
import ProfileCard from './components/ui/ProfileCard';
import ProfileInfo from './components/ProfileInfo';
import ProfileStatistics from './components/ProfileStatistics';
import BenefitListBtn from './components/BenefitListBtn';
import FeedbackBtn from './components/FeedbackBtn';
import LogoutBtn from './components/LogoutBtn';
import WithdrawBtn from './components/WithdrawBtn';
import ModalContainer from './components/ModalContainer';

const page = () => {
  return (
    <div className='min-h-screen bg-white w-full relative pb-20'>
      <div className="px-4 py-6 space-y-6">
        <ProfileCard className='p-6'>
          <ProfileInfo />
        </ProfileCard>
        <ProfileCard className='p-6'>
          <ProfileStatistics />
        </ProfileCard>
        <div className='space-y-2'>
          <ProfileCard>
            <BenefitListBtn />
          </ProfileCard>
          <ProfileCard>
            <FeedbackBtn />
          </ProfileCard>
          <ProfileCard>
            <LogoutBtn />
          </ProfileCard>
          <ProfileCard>
            <WithdrawBtn />
          </ProfileCard>

          <ModalContainer />
        </div>
      </div>
    </div>
  );
};

export default page;