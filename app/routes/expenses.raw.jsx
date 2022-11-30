import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export const loader = async ({ request }) => {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
};
