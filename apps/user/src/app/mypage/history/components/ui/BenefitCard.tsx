import { Card, CardContent } from '@workspace/ui/components/card';

import React, { ReactNode } from 'react';

interface BenefitCardProps {
  children: ReactNode;
}

const BenefitCard = ({ children }: BenefitCardProps) => {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default BenefitCard;