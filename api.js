import express from 'express'
import path from 'node:path'

export const apiServer = express()

apiServer.use(express.static(path.join(import.meta.dirname, "public")))

apiServer.use('/', express.static('index.html'))