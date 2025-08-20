const { Client, logger, Variables } = require('camunda-external-task-client-js')

const baseUrl =
    process.env.CAMUNDA_BASE_URL || 'http://localhost:8051/engine-rest'

// Configure client
const config = {
    baseUrl,
    workerId: 'node-worker-1',
    maxTasks: 5,
    asyncResponseTimeout: 10000, // long polling (10s)
    interceptors: logger // built‑in logging
}

const client = new Client(config)

// Example: Send Email task
client.subscribe('send-email', async ({ task, taskService }) => {
    const recipient = task.variables.get('recipient')
    console.log(`📧 Sending email to ${recipient}`)

    // ... email sending logic here ...

    await taskService.complete(task)
})

// Example: Generate Report task
client.subscribe('generate-report', async ({ task, taskService }) => {
    const reportType = task.variables.get('reportType')
    console.log(`📊 Generating report: ${reportType}`)

    // Create process variable for result
    const processVariables = new Variables()
    processVariables.set(
        'reportUrl',
        `https://example.com/reports/${reportType}`
    )

    await taskService.complete(task, processVariables)
})

// Example: Archive Data task
client.subscribe('archive-data', async ({ task, taskService }) => {
    console.log(`🗄 Archiving data for task ${task.id}`)
    await taskService.complete(task)
})

console.log('🚀 Worker started. Listening for external tasks...')
