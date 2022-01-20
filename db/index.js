import * as pg from 'pg';

const pool = pg.Pool();

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
