import { chmod, mkdir, readFile, rename, writeFile } from 'node:fs/promises'

const stateDir = process.env.DSH_HOME ?? '/data/state'
const settingsPath = `${stateDir}/settings.json`
const temporaryPath = `${settingsPath}.tmp`
const baseURL = process.env.DSH_LLM_BASE_URL?.replace(/\/+$/, '')
const defaultModel = process.env.DSH_LLM_MODEL ?? 'qwen-q3'
const modelIds = new Set(['qwen-q3', 'qwen-q2'])

if (!baseURL) throw new Error('DSH_LLM_BASE_URL não foi definido')
if (!modelIds.has(defaultModel)) {
  throw new Error(`DSH_LLM_MODEL deve ser qwen-q3 ou qwen-q2, recebido: ${defaultModel}`)
}

await mkdir(stateDir, { recursive: true, mode: 0o700 })
await chmod(stateDir, 0o700)

let settings = {}
try {
  settings = JSON.parse(await readFile(settingsPath, 'utf8'))
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

const llmSettings = settings['llm-pi-ai'] ?? {}
settings['llm-pi-ai'] = {
  ...llmSettings,
  providers: {
    ...(llmSettings.providers ?? {}),
    'local-qwen': {
      displayName: 'Qwen local',
      apiKeyEnv: 'LOCAL_QWEN_API_KEY',
      api: 'openai-completions',
      baseURL,
      compat: {
        supportsDeveloperRole: false,
        maxTokensField: 'max_tokens',
      },
      models: [
        { id: 'qwen-q3', name: 'Qwen 3.8 27B Q3', contextWindow: 8192 },
        { id: 'qwen-q2', name: 'Qwen 3.8 27B Q2', contextWindow: 16384 },
      ],
    },
  },
}

settings['agent-default-model'] ??= {
  provider: 'local-qwen',
  model: defaultModel,
}

await writeFile(temporaryPath, `${JSON.stringify(settings, null, 2)}\n`, { mode: 0o600 })
await rename(temporaryPath, settingsPath)
await chmod(settingsPath, 0o600)
