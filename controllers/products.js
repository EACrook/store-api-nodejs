const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async errors');
    const search = 'ab';
    const products = await Product.find({}).select('name price');
    res.status(200).json({msg: products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query;
    const queryObject = {}
    // search by featured items
    if (featured) {
        queryObject.featured = featured === 'true'? true : false;
    }
    // search by company
    if (company) {
        queryObject.company = company;
    }
    // search by object name
    if (name) {
        queryObject.name = { $regex:name, $options: 'i' };
    }
    // console.log(queryObject);
    let result = Product.find(queryObject);
    // sort the items by certain parameters
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
        // products = products.sort()
    } else {
        result = result.sort('createdAt');
    }
    // only show selected fields in search
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const products = await result
    res.status(200).json({ products, nbHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}