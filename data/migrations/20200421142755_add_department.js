
exports.up = function(knex) {
    return knex.schema
        .table('users', tbl => {
            tbl.string('department').notNullable().defaultTo('');
        })

};

exports.down = function(knex) {
    return knex.schema 
        .table('users', tbl => {
           tbl.dropColumn('department'); 
        })
};
