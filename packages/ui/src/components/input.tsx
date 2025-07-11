import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const calendar = "font-medium border-0 border-b-2 pb-2 pr-8 focus-visible:border-action-green";

const inputVariants = cva(
  "flex h-10 w-full border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "rounded-lg border",
        calendar: `text-base ${calendar}`,
        modalCalendar: `text-sm ${calendar}`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Input({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
