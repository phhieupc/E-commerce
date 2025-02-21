const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database connection with mongodb
mongoose
    .connect('mongodb+srv://hieuphan2k3:phanhuuhieu2k3@cluster0.z7i93.mongodb.net/e-commerce')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.get('/', (req, res) => {
    res.send('Express app is running');
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// Creating upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Schema for creating products
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Schema creating for Account model
const Account = mongoose.model('Account', {
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Schema creating for News model
const News = mongoose.model('News', {
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating Endpoint for registering account
app.post('/signup', async (req, res) => {
    let check1 = await Account.findOne({ username: req.body.username });

    if (check1) {
        return res.status(400).json({ success: false, error: 'Tên đăng nhập đã tồn tại!' });
    }

    let check2 = await Account.findOne({ email: req.body.email });

    if (check2) {
        return res.status(400).json({ success: false, error: 'Email đã tồn tại!' });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    let accounts = await Account.find({});
    let id;
    if (accounts.length > 0) {
        let last_account_array = accounts.slice(-1);
        let last_account = last_account_array[0];
        id = last_account.id + 1;
    } else {
        id = 1;
    }
    const account = new Account({
        id,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await account.save();

    const data = {
        account: {
            id: account.id,
        },
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Creating Endpoint for Account login
app.post('/login', async (req, res) => {
    let account = await Account.findOne({ username: req.body.username });

    if (account) {
        const passCompare = req.body.password === account.password;
        if (passCompare) {
            const data = {
                account: {
                    id: account.id,
                },
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: 'Wrong username or password' });
        }
    } else {
        res.json({ success: false, error: 'Wrong account' });
    }
});

// Creating endpoint for add product
app.post('/add-product', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
    });
    console.log(product);
    await product.save();
    console.log('Save successfully');
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for get product
app.get('/get-product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Creating API for editing product
app.post('/edit-product', async (req, res) => {
    try {
        const { id, name, image, category, new_price, old_price } = req.body;

        const product = await Product.findOneAndUpdate(
            { id },
            { name, image, category, new_price, old_price },
            { new: true },
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Creating API for deleting product
app.post('/remove-product', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        console.log('Product removed successfully');
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Creating API for getting all products
app.get('/all-products', async (req, res) => {
    let products = await Product.find({});
    console.log('All products fetched');
    res.send(products);
});

// Creating API for getting all news
app.get('/all-news', async (req, res) => {
    let news = await News.find({});
    console.log('All news fetched');
    res.send(news);
});

// Creating API for adding news
app.post('/add-news', async (req, res) => {
    let news = await News.find({});
    let id;
    if (news.length > 0) {
        let last_news_array = news.slice(-1);
        let last_news = last_news_array[0];
        id = last_news.id + 1;
    } else {
        id = 1;
    }
    const news_one = new News({
        id,
        title: req.body.title,
        image: req.body.image,
        detail: req.body.detail,
    });
    console.log(news_one);
    await news_one.save();
    console.log('Save successfully');
    res.json({
        success: true,
        title: req.body.title,
    });
});

// Creating API for getting news
app.get('/get-news/:id', async (req, res) => {
    try {
        const news = await News.findOne({ id: req.params.id });

        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }

        res.json({ success: true, news });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Creating API for editing news
app.post('/edit-news', async (req, res) => {
    try {
        const { id, title, image, detail } = req.body;
        console.log(req.body);

        const news = await News.findOneAndUpdate({ id }, { title, image, detail }, { new: true });

        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }

        res.json({ success: true, message: 'News updated successfully', news });
    } catch (error) {
        console.error('Error editing news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Creating API for deleting news
app.post('/delete-news', async (req, res) => {
    try {
        const deletedNews = await News.findOneAndDelete({ id: req.body.id });
        if (!deletedNews) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        console.log('News deleted successfully');
        res.json({ success: true, title: req.body.title });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Creating Endpoint for New collection data
app.get('/new-collection', async (req, res) => {
    let product = await Product.find({});
    let newCollection = product.slice(1).slice(-8);
    console.log('New Collection Fetched');
    res.send(newCollection);
});

// Creating Endpoint popular data
app.get('/popular-in-men', async (req, res) => {
    let product = await Product.find({ category: 'men' });
    let popular = product.slice(1).slice(-4);
    console.log('Popular in men Fetched');
    res.send(popular);
});

app.get('/popular-in-women', async (req, res) => {
    let product = await Product.find({ category: 'women' });
    let popular = product.slice(1).slice(-4);
    console.log('Popular in women Fetched');
    res.send(popular);
});

app.get('/popular-in-kids', async (req, res) => {
    let product = await Product.find({ category: 'kids' });
    let popular = product.slice(1).slice(-4);
    console.log('Popular in kids Fetched');
    res.send(popular);
});

// Creating middleware to fetch account
const fetchAccount = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({
            error: 'Vui lòng đăng nhập!',
        });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.account = data.account;
            next();
        } catch (errors) {
            res.status(401).send({
                error: 'Vui lòng đăng nhập!',
            });
        }
    }
};

// Creating endpoint for adding product into cart
app.post('/add-to-cart', fetchAccount, async (req, res) => {
    console.log(req.body, req.account);

    try {
        let accountData = await Account.findOne({ id: req.account.id });
        if (!accountData) {
            return res.status(404).send({
                error: 'Tài khoản không tồn tại',
            });
        }

        // Đảm bảo cartData tồn tại
        if (!accountData.cartData) {
            accountData.cartData = {};
        }

        // Kiểm tra nếu itemId chưa có thì gán giá trị ban đầu là 0 rồi tăng lên 1
        accountData.cartData[req.body.itemId] = (accountData.cartData[req.body.itemId] || 0) + 1;

        // Cập nhật vào database
        await Account.findOneAndUpdate({ id: req.account.id }, { cartData: accountData.cartData });

        res.send({ message: 'Added' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Lỗi máy chủ' });
    }
});

// Creating endpoint to remove product from cartData
app.post('/remove-from-cart', fetchAccount, async (req, res) => {
    try {
        let accountData = await Account.findOne({ id: req.account.id });
        if (!accountData) {
            return res.status(404).send({ error: 'Tài khoản không tồn tại' });
        }

        // Đảm bảo cartData tồn tại
        if (!accountData.cartData) {
            accountData.cartData = {};
        }

        if (accountData.cartData[req.body.itemId] > 0) {
            accountData.cartData[req.body.itemId] -= 1;
        }

        // Cập nhật vào database
        await Account.findOneAndUpdate({ id: req.account.id }, { cartData: accountData.cartData });

        res.send({ message: 'Removed' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Lỗi máy chủ' });
    }
});

// Creating endpoint to get cartData
app.get('/get-cart', fetchAccount, async (req, res) => {
    try {
        console.log('Get Cart');

        let accountData = await Account.findOne({ id: req.account.id });

        if (!accountData) {
            return res.status(404).json({ error: 'Tài khoản không tồn tại' });
        }

        res.json(accountData.cartData || {}); // Always return an object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
});

// API creation
app.listen(port, (error) => {
    if (!error) {
        console.log(`App listening at http://localhost:${port}`);
    } else {
        console.log('Error: ', error);
    }
});
