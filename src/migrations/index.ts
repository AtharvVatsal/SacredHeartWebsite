import * as migration_20261021_053504_initial from './20261021_053504_initial';

export const migrations = [
  {
    up: migration_20261021_053504_initial.up,
    down: migration_20261021_053504_initial.down,
    name: '20261021_053504_initial'
  },
];
