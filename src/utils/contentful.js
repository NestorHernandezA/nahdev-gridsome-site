import { createClient } from 'contentful';

export default createClient({
  space: process.env.GRIDSOME_CONTENTFUL_SPACE,
  accessToken: process.env.GRIDSOME_CONTENTFUL_ACCESS_TOKEN,
});




