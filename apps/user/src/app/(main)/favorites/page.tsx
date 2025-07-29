import FavoriteBrandSection from "@/app/(main)/favorites/components/FavoriteBrandSection";

export default function FavoritesPage() {
  return (
    <section className="scrollbar-hide">
      {/* <hr className="border-gray-300" /> */}
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">즐겨찾기</h3>
        <FavoriteBrandSection />
      </div>
    </section>
  );
}
