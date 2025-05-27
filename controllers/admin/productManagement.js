const Product = require("../../models/Product");

exports.createProduct = async (req, res) => {
  const { product_name, product_price, category_id, seller_id } = req.body;

  try {
    const product = new Product({
      product_name: product_name,
      product_price: product_price,
      category_id: category_id,
      seller_id: seller_id,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const{page = 1,limit=10,search=""}=req.query
    let filter = {}

    if(search){
      filter.$or = [
        {name:{$regex:search,$options:"i"}}
      ]

    }
    const skip = (page -1) * limit;

    const products = await Product.find(filter)
      .populate("category_id", "name")
      .populate("seller_id", "firstName email")
      .skip(skip)
      .limit(Number(limit))

      const total = await Product.countDocuments(filter)

    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data: products,
      pagination:{
        total,
        page:Number(page),
        limit:Number(limit),
        totalPages:Math.ceil(total/limit) // ceil round number

      } // pagination metadata
      
    });
    
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
