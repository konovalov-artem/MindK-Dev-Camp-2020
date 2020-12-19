const { PORT, NODE_ENV } = process.env

export default {
  port: parseInt(PORT, 10),
  nodeEnv: NODE_ENV,
  isProd: NODE_ENV === 'prod',
  isDev: NODE_ENV === 'dev',
}
