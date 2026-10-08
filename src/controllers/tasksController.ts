import { Response } from 'express'
import { pool } from '../config/database'
import { AuthRequest } from '../middlewares/authMiddleware'

export async function getTasks(req: AuthRequest, res: Response) {
  const { status } = req.query

  try {
    let query = 'SELECT * FROM tasks WHERE user_id = $1'
    const params: (number | string)[] = [req.userId!]

    if (status) {
      query += ' AND status = $2'
      params.push(status as string)
    }

    query += ' ORDER BY created_at DESC'

    const result = await pool.query(query, params)
    return res.json(result.rows)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function createTask(req: AuthRequest, res: Response) {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title is required' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.userId, title, description || null]
    )
    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  const { id } = req.params
  const { title, description, status } = req.body

  const validStatus = ['pending', 'in_progress', 'done']
  if (status && !validStatus.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  try {
    const taskExists = await pool.query(
      'SELECT id FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    )

    if (taskExists.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [title, description, status, id, req.userId]
    )
    return res.json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    return res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}