const EmptyRecommend = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="py-15 w-full text-center text-gray-400">{children}</div>;
};

export default EmptyRecommend;
