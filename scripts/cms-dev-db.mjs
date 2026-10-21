// Local development database for the CMS: a private PostgreSQL cluster in .cms/pgdata, listening on
// 127.0.0.1:54329 only, with no password (trust auth is limited to this machine). It uses the PostgreSQL
// programs already installed on the computer and never touches any other PostgreSQL server.
//
//   node scripts/cms-dev-db.mjs init    create the cluster and the shs_cms + shs_cms_test databases
//   node scripts/cms-dev-db.mjs start   start it
//   node scripts/cms-dev-db.mjs stop    stop it
//   node scripts/cms-dev-db.mjs status
//
// Never use this for production: it has no password and lives in the project folder.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, appendFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const DATA = path.join(ROOT, '.cms', 'pgdata')
const LOG = path.join(ROOT, '.cms', 'postgres.log')
const PORT = process.env.CMS_DEV_DB_PORT || '54329'
const DATABASES = ['shs_cms', 'shs_cms_test']

function findBin() {
  if (process.env.PG_BIN) return process.env.PG_BIN
  if (process.platform === 'win32') {
    const base = 'C:\\Program Files\\PostgreSQL'
    if (existsSync(base)) {
      const versions = readdirSync(base).filter((v) => /^\d+$/.test(v)).sort((a, b) => Number(b) - Number(a))
      for (const v of versions) if (existsSync(path.join(base, v, 'bin', 'pg_ctl.exe'))) return path.join(base, v, 'bin')
    }
  }
  return '' // rely on PATH
}

const BIN = findBin()
const exe = (name) => (BIN ? path.join(BIN, process.platform === 'win32' ? `${name}.exe` : name) : name)
const run = (name, args, opts = {}) => execFileSync(exe(name), args, { stdio: 'inherit', ...opts })
// pg_ctl start leaves the server running; it must not inherit this console's handles or the call never returns on Windows
const startServer = () => run('pg_ctl', ['-D', DATA, '-l', LOG, '-w', 'start'], { stdio: 'ignore' })

const cmd = process.argv[2]
const isRunning = () => { try { run('pg_ctl', ['-D', DATA, 'status'], { stdio: 'ignore' }); return true } catch { return false } }

if (cmd === 'init') {
  if (existsSync(path.join(DATA, 'PG_VERSION'))) {
    console.log('Cluster already exists at', DATA)
  } else {
    mkdirSync(DATA, { recursive: true })
    run('initdb', ['-D', DATA, '-U', 'postgres', '--auth=trust', '--encoding=UTF8', '--no-locale'])
    appendFileSync(path.join(DATA, 'postgresql.conf'), `\nlisten_addresses = '127.0.0.1'\nport = ${PORT}\n`)
  }
  if (!isRunning()) startServer()
  for (const db of DATABASES) {
    try {
      run('createdb', ['-h', '127.0.0.1', '-p', PORT, '-U', 'postgres', db], { stdio: 'pipe' })
      console.log('Created database', db)
    } catch {
      console.log('Database', db, 'already exists')
    }
  }
  console.log(`\nDATABASE_URL=postgres://postgres@127.0.0.1:${PORT}/shs_cms`)
} else if (cmd === 'start') {
  if (isRunning()) console.log('Already running on port', PORT)
  else { startServer(); console.log('Started on port', PORT) }
} else if (cmd === 'stop') {
  run('pg_ctl', ['-D', DATA, '-w', 'stop'])
} else if (cmd === 'status') {
  try { run('pg_ctl', ['-D', DATA, 'status']) } catch { process.exitCode = 0 }
} else {
  console.log('usage: node scripts/cms-dev-db.mjs init|start|stop|status')
  process.exitCode = 1
}
