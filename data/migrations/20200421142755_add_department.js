
exports.up = function(knex) {
    return knex.schema
        .table('users', tbl => {
            tbl.string('department').notNullable().defaultTo('no-department');
        })

};

exports.down = function(knex) {
    return knex.schema 
        .table('users', tbl => {
           tbl.dropColumn('department'); 
        })
};
