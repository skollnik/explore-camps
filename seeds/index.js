const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelper')
const Campground = require('../models/campgrounds')

mongoose.connect('mongodb://localhost:27017/explore-campgrounds', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error: '))
db.once('open', () => {
    console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random = Math.floor((Math.random() * 1000))
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '623b77d3eafd63dceeee4113',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmmzd599x/image/upload/v1648554684/ExploreCamps/lkfrwwjjahgxc7uid4dy.jpg',
                    filename: 'ExploreCamps/lawokm0dxpcohfukjp4m',
                },
                {
                    url: 'https://res.cloudinary.com/dmmzd599x/image/upload/v1648496931/ExploreCamps/oy4knhdovlqj6phbzytt.jpg',
                    filename: 'ExploreCamps/s13l0yiwvikp4gwc0rca',
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque reiciendis, soluta quam harum, saepe corrupti sapiente perspiciatis quo ipsa, ad voluptates explicabo ipsum consequatur mollitia? Officiis sequi nostrum natus quod!',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})