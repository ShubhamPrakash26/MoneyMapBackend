import { sql } from '../config/db.js';
export async function getSummaryByUserId(req, res) {
    try {
      const { userId } = req.params;
      
      const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS balance
        FROM transactions
        WHERE user_id = ${userId}
      `;
      const income = await sql`
        SELECT COALESCE(SUM(amount), 0) AS income
        FROM transactions
        WHERE user_id = ${userId} AND amount > 0
      `;
      const expenses = await sql`
        SELECT COALESCE(SUM(amount), 0) AS income
        FROM transactions
        WHERE user_id = ${userId} AND amount < 0
      `;
      res.status(200).json({
        balance: balanceResult[0].balance, 
        income: income[0].income, 
        expenses: expenses[0].income
        });
    } catch (error) {
      console.log('Error fetching transaction summary:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}