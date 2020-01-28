
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Spongebob', password: 'pineapple'},
        {id: 2, username: 'Patrick', password: 'rock'},
        {id: 3, username: 'Snail', password: 'shell'}
      ]);
    });
};
