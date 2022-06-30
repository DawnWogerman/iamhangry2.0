const { Post } = require('../models');

const postdata = [
  {
    location: 'Donec posuere metus vitae ipsum.',
    num_of_drinks: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    post_url: 'https://nasa.gov/donec.json',
  
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    post_url: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx'
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
