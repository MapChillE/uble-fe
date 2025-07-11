"use client";

import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { useState } from "react";

interface GenderRadioProps {
  isModal?: boolean;
}

export default function GenderRadio({ isModal }: GenderRadioProps) {
  const [gender, setGender] = useState("남성");

  return (
    <RadioGroup gap={isModal ? "modal" : "default"} value={gender} onValueChange={setGender}>
      {["남성", "여성"].map((gender) => (
        <div key={gender} className="flex cursor-pointer items-center space-x-3">
          <RadioGroupItem
            value={gender}
            id={gender}
            size={isModal ? "modal" : "default"}
            iconSize={isModal ? "modal" : "default"}
          />
          <Label htmlFor={gender}>{gender}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
