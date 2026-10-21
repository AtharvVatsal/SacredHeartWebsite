// Creates an administrator account from the command line, so no account ever has to be created through a
// public web page and no password is ever written into the repository.
//
//   npm run cms:create-admin                      (asks for name, email and password)
//   npm run cms:create-admin -- you@example.org "Full Name"   (asks only for the password)
//
// For automated test setups only, CMS_ADMIN_EMAIL, CMS_ADMIN_NAME and CMS_ADMIN_PASSWORD may be used instead.
import readline from 'node:readline'
import { getPayload } from 'payload'
import config from '@payload-config'

// payload run passes positional arguments only: [email] [name]
const [argEmail, argName] = process.argv.slice(2)

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    if (hidden) {
      const write = (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput
      ;(rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = (s: string) => {
        if (s.startsWith(question)) write.call(rl, s)
        else write.call(rl, '*'.repeat(s.length))
      }
    }
    rl.question(question, (answer) => {
      rl.close()
      if (hidden) process.stdout.write('\n')
      resolve(answer.trim())
    })
  })
}

async function main() {
  const email = (argEmail || process.env.CMS_ADMIN_EMAIL || (await ask('Email address: '))).toLowerCase()
  const name = argName || process.env.CMS_ADMIN_NAME || (await ask('Full name: '))
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('A name and a valid email address are required.')

  let password = process.env.CMS_ADMIN_PASSWORD || ''
  if (!password) {
    password = await ask('Password (at least 12 characters): ', true)
    const again = await ask('Repeat the password: ', true)
    if (password !== again) throw new Error('The passwords do not match.')
  }
  if (password.length < 12) throw new Error('Use a password of at least 12 characters.')

  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, overrideAccess: true })
  if (existing.docs.length) throw new Error(`An account for ${email} already exists. Reset its password in the admin instead.`)

  // context.bootstrapAdmin lets this trusted script create an account without being signed in (see Users.ts)
  await payload.create({ collection: 'users', data: { name, email, password, role: 'admin' }, overrideAccess: true, context: { bootstrapAdmin: true } })
  console.log(`\nAdministrator ${email} created. Sign in at ${process.env.CMS_SERVER_URL || 'http://localhost:3000'}/admin`)
  process.exit(0)
}

// Top-level await: payload run exits as soon as this module finishes importing
await main().catch((error) => {
  console.error(`\nCould not create the administrator: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
