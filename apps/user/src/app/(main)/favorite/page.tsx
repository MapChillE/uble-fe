import FavoriteSectionProvider from "@/app/(main)/favorite/components/FavoriteSectionProvider";

export default function FavoritePage() {
  return (
    <section>
      {/* <hr className="border-gray-300" /> */}
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">즐겨찾기</h3>
        <FavoriteSectionProvider />
      </div>
    </section>
  );
}
