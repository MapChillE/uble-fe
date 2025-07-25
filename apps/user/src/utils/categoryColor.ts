export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "액티비티":
      return "bg-red-100 text-red-800";
    case "뷰티/건강":
      return "bg-orange-100 text-orange-800";
    case "쇼핑":
      return "bg-emerald-100 text-emerald-800";
    case "생활/건강":
      return "bg-blue-100 text-blue-800";
    case "문화/여가":
      return "bg-purple-100 text-purple-800";
    case "교육":
      return "bg-yellow-100 text-yellow-800";
    case "여행/교통":
      return "bg-teal-100 text-teal-800";
    case "식당":
      return "bg-rose-100 text-rose-800";
    case "카페":
      return "bg-orange-100 text-orange-800";
    case "우리동네멤버십":
      return "bg-slate-100 text-slate-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};
