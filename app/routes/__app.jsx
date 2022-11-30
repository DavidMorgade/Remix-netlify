import { Outlet } from '@remix-run/react';
import ExpensesHeader from '~/components/navigation/ExpensesHeader';
import expensesStyles from '~/styles/expenses.css';

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export const links = () => {
  return [{ rel: 'stylesheet', href: expensesStyles }];
};
