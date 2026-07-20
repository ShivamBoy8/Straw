const validateproduct = (body, files) => {
  if (
    !body.title ||
    !body.description ||
    !body.category ||
    !body.subCategory ||
    !body.price
  ) {
    throw new Error("All required fields are mandatory.");
  }

  if (body.discountPrice && Number(body.discountPrice) > Number(body.price)) {
    throw new Error("Discount price cannot exceed price.");
  }

  if (Number(body.price)<= 0) {
    throw new Error("price cannot be zero.");
  }
  if (!files || files.length === 0) {
    throw new Error("Please upload at least one image.");
  }
};

module.exports = validateproduct;
