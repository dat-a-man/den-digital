export default {
  name: 'views',
  title: 'Views',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
    },
    {
      name: 'views',
      title: 'Views',
      type: 'number',
    },
  ],
}
