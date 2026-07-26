const ai = require("../config/gemini");
const Product = require("../model/Product");
const User = require("../model/User");

const recommendSize = async (req, res) => {
  try {
    const { productId, fitPreference } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const height = user.height;
    const weight = user.weight;
    const gender = user.gender;
    const age = user.age;
    const bodyType = user.bodyType;
    const footSize = user.footSize;

    if (!productId || !fitPreference) {
      return res.status(400).json({
        success: false,
        message: "Product and fit preference are required.",
      });
    }

    if (!height || !weight || !gender || !age || !bodyType || !footSize) {
      return res.status(400).json({
        success: false,
        message:
          "Please complete your profile before using AI recommendations.",
      });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const prompt = `You are an expert fashion stylist and sizing/fit consultant for a premium online fashion brand. Recommend the SINGLE BEST SIZE for this customer using their profile and the product info below.

CUSTOMER: Height ${height}cm | Weight ${weight}kg | Age ${age} | Gender ${gender} | Body Type ${bodyType} | Foot Size ${footSize} | Preferred Fit: ${fitPreference}

PRODUCT: "${product.title}" | Brand: ${product.brand} | Category: ${product.category} | Description: ${product.description} | Available Sizes: ${product.sizes.join(", ")}

STORE CATALOG (for context on product types): Men's/Women's/Kids clothing. Upperwear: T-Shirts, Shirts, Hoodies, Jackets, Sweatshirts. Bottomwear: Jeans, Trousers, Joggers, Shorts, Cargo. Footwear: Sneakers, Boots, Running Shoes, Sandals, Loafers.

RULES:
1. Determine the product type (footwear vs. clothing) from its title, category and description.
2. Footwear: prioritize Foot Size; use height/weight only as supporting context. Recommend exactly one available footwear size.
3. Clothing: use height, weight, age, gender and body type; respect the preferred fit. Recommend exactly one available clothing size.
4. Only recommend a size from Available Sizes — never invent one. If the ideal size isn't available, pick the closest available option.
5. Compare the chosen size against the other available sizes and explain why it's best, in natural, practical, confident language (no hedging or uncertainty).
6. Return ONLY valid JSON, exactly matching this shape — no extra text, no markdown:

{
  "recommendedSize": "M",
  "reason": "Based on the customer's height, weight, age, body type and preferred regular fit, size M provides the most balanced fit. Smaller sizes may feel tight around the shoulders and chest, while larger sizes could appear loose. Among the available options, M is the best recommendation."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    let recommendation;

    try {
      recommendation = JSON.parse(cleanedText);
    } catch {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
      });
    }

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