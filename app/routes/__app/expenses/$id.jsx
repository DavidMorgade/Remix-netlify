import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
// import { getExpense } from '~/data/expenses.server';

const UpdateExpensesPage = () => {
  const navigate = useNavigate();
  function closeHandler() {
    // Navigate programmately
    navigate('..');
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
};

// export async function loader({ params }) {
//   console.log('EXPENSES id LOADER');
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.id;
  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }
}

export function meta({ params, location, data, parentsData }) {
  const expense = parentsData['routes/__app/expenses'].find(
    (expense) => expense.id === params.id
  );
  return {
    title: expense.title,
    description: 'Manage your expenses',
  };
}

export default UpdateExpensesPage;
