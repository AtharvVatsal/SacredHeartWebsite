import * as migration_20261021_053504_initial from './20261021_053504_initial';
import * as migration_20261026_170049_site_figures from './20261026_170049_site_figures';

export const migrations = [
  {
    up: migration_20261021_053504_initial.up,
    down: migration_20261021_053504_initial.down,
    name: '20261021_053504_initial',
  },
  {
    up: migration_20261026_170049_site_figures.up,
    down: migration_20261026_170049_site_figures.down,
    name: '20261026_170049_site_figures'
  },
];
