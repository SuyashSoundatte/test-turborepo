import WebSocket, { WebSocketServer } from "ws"
import * as dotenv from "dotenv"
dotenv.config()

import { pool } from "@repo/postgres"

const wss = new WebSocketServer({ port: 3001 })

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', async function message(data) {
    try {
      const { username, password } = JSON.parse(data.toString())

      const result = await pool.query(
        `INSERT INTO Users(username, password) VALUES ($1, $2) RETURNING *`,
        [username, password]
      )
      // console.log(result);

      ws.send(JSON.stringify({
        status: 'success',
        user: result.rows[0].id
      }))
    } catch (err) {
      console.error('Error inserting user:', err)
      ws.send(JSON.stringify({
        status: 'error',
        message: 'Failed to insert user.'
      }))
    }
  })

  ws.send('Connected to WebSocket server')
})
