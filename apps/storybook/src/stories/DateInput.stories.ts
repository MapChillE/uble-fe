import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateInput } from "@user/components/user/DateInput";

const meta = {
  title: "Components/DateInput",
  component: DateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isModal: {
      control: { type: "boolean" },
      description: "모달 스타일 사용 여부",
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isModal: false,
  },
};

export const Modal: Story = {
  args: {
    isModal: true,
  },
};
