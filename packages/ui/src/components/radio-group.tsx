"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@workspace/ui/lib/utils";

const radioGroupVariants = cva("grid", {
  variants: {
    gap: {
      default: "gap-3",
      modal: "gap-2",
    },
  },
  defaultVariants: {
    gap: "default",
  },
});

const radioItemVariants = cva(
  "ring-offset-background focus-visible:ring-ring aspect-square border border-gray-300 data-[state=checked]:border-action-green data-[state=checked]:bg-action-green focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-full ",
  {
    variants: {
      size: {
        default: "w-5 h-5",
        modal: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const radioIconVariants = cva(
  "rounded-full bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform을",
  {
    variants: {
      iconSize: {
        default: "w-2 h-2",
        modal: "h-1.5 w-1.5",
      },
    },
    defaultVariants: {
      iconSize: "default",
    },
  }
);

function RadioGroup({
  className,
  gap,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> &
  VariantProps<typeof radioGroupVariants>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(radioGroupVariants({ gap }), className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  size,
  iconSize,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioItemVariants> &
  VariantProps<typeof radioIconVariants>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioItemVariants({ size, className }))}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className={cn(radioIconVariants({ iconSize, className }))} stroke="none" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioItemVariants, radioIconVariants };
