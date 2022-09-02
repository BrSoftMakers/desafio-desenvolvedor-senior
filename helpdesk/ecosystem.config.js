module.exports = {
  apps: [{
    name: 'helpdesk',
    script: './server.js',
    instances: process.env.INSTANCES,
    exec_mode: 'cluster',
    merge_logs: true
  }]
}
