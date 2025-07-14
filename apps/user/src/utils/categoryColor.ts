export const getCategoryColor = (category: string) => {
  switch (category) {
    case "푸드":
      return "bg-orange-100 text-orange-800"
    case "문화여가":
      return "bg-purple-100 text-purple-800"
    case "뷰티/건강":
      return "bg-pink-100 text-pink-800"
    case "쇼핑":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}