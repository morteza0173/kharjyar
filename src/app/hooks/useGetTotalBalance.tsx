import useGetAccount from "./useGetAccount";
import useGetTransaction from "./useGetTransaction";

export const useGetTotalBalance = () => {
  const { data: accounts } = useGetAccount();
  const { data: transactions } = useGetTransaction();
  const balance = accounts.map((account) => {
    let finalBalance = account.balance;

    const accountTransactions = transactions.filter(
      (tx) => tx.accountId === account.id
    );

    // محاسبه تغییرات
    accountTransactions.forEach((tx) => {
      if (tx.type === "INCOME" && tx.accountId === account.id) {
        finalBalance += tx.amount;
      } else if (tx.type === "EXPENSE" && tx.accountId === account.id) {
        finalBalance -= tx.amount;
      }
    });

    return {
      ...account,
      finalBalance,
    };
  });

  const totalBalance = balance.reduce((sum, acc) => sum + acc.finalBalance, 0);

  return totalBalance;
};
