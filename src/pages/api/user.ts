import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )

  const { userId } = req.query
  if (!userId) return res.status(400).json({ message: 'Missing user id' })

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId)

    if (error) return res.status(500).json({ error: error.message })

    res.status(200).json(data)
  } else if (req.method === 'PUT') {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, req.body)

    if (error) return res.status(500).json({ error: error.message })

    res.status(200).json(data)
  }

  res.status(405).json({ message: 'Method not allowed' })
}