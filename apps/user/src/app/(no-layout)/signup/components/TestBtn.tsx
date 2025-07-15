'use client'
import { getUserInfo } from '@/service/user';
import { apiHandler } from '@api/apiHandler';



const TestBtn = () => {
  const test = async () => {
    apiHandler(() => getUserInfo());
  }

  return (
    <button onClick={test}>
      test
    </button>
  );
};

export default TestBtn;