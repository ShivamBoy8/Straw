const validateUpdateProduct = (body) => {
  if (body.title !== undefined && body.title.trim() === "") {
    throw new Error("Title cannot be empty");
  }

  if (body.description !== undefined && body.description.trim() === "") {
    throw new Error("Description cannot be empty");
  }

  if (body.brand !== undefined && body.brand.trim() === "") {
    throw new Error("Brand cannot be empty");
  }

  if (body.price !== undefined) {
    if (isNaN(body.price) || Number(body.price) < 0) {
      throw new Error("Invalid price");
    }
  }

  if (body.discountPrice !== undefined) {
    if (isNaN(body.discountPrice) || Number(body.discountPrice) < 0) {
      throw new Error("Invalid discount price");
    }
  }

  if (
    body.price !== undefined &&
    body.discountPrice !== undefined &&
    Number(body.discountPrice) > Number(body.price)
  ) {
    throw new Error("Discount price cannot be greater than price");
  }

  if (body.stock !== undefined) {
    if (isNaN(body.stock) || Number(body.stock) < 0) {
      throw new Error("Invalid stock");
    }
  }
};

module.exports = validateUpdateProduct;