import { generateAdditionWorksheet } from "./worksheet-libs/addition-lib";

export const generateWorksheet = (data) => {
  const category = data.category;
  const subCategory = data.subCategory;

  switch (category) {
    case "Addition":
      return generateAdditionWorksheet(subCategory, data.config);
    default:
      return;
  }
};
