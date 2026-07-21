const ai = require("../config/gemini");
const Product = require("../model/Product");

const recommendSize = async (req, res) => {
  try {
    const { height, weight, gender, productId } = req.body;

    if (!height || !weight || !gender || !productId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const prompt = `
You are a fashion size recommendation expert.

Customer Details:
- Height: ${height} cm
- Weight: ${weight} kg
- Gender: ${gender}

Product Details:
- Title: ${product.title}
- Category: ${product.category}
- Available Sizes: ${product.sizes.join(", ")}

Recommend the best size.

Respond ONLY in valid JSON.

Example:
{
  "recommendedSize": "M",
  "reason": "Your detailed explanation here. "
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const recommendation = JSON.parse(cleanedText);

    return res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  recommendSize,
};
