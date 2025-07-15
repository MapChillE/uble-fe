import { Card, CardContent } from '@workspace/ui/components/card';
import { ReactNode } from 'react';

interface ProfileCardProps {
  children: ReactNode;
  className?: "p-0" | "p-6";
}

const ProfileCard = ({ children, className = 'p-0' }: ProfileCardProps) => {
  return (
    <Card className="border-gray-200">
      <CardContent className={className}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;