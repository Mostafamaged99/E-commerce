const generateMessage = (message) => ({
  addedSuccessfully: `${message} added successfully`,
  updatedSuccessfully: `${message} updated successfully`,
  deletedSuccessfully: `${message} deleted successfully`,
  successGet: `${message} get successfully`,
  notFound: `${message} not found`,
});

export const messages = {
  category: { ...generateMessage("Category") },
  product: { ...generateMessage("Product") },
  user: { ...generateMessage("User") },
  subCategory: { ...generateMessage("Sub Category") },
  brand: { ...generateMessage("Brand") },
};
