export const selectToEng = (gender: string): "MALE" | "FEMALE" => {
  return gender === "남성" ? "MALE" : "FEMALE";
}; 