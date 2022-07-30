#!/usr/bin/env node

import { once } from 'node:events'
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const PARALLEL_DIR = new URL('./parallel/', import.meta.url)
const dir = await fs.opendir(PARALLEL_DIR)

for await (const { name } of dir) {
  if (!name.endsWith('.js')) continue
  const cp = spawn(
    process.execPath,
    [fileURLToPath(new URL(name, PARALLEL_DIR))],
    { stdio: 'inherit' }
  )
  const [code] = await once(cp, 'exit')
  if (code) process.exit(code)
}
