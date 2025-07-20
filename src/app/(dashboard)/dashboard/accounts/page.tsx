"use client";

import useGetAccount from "@/app/hooks/useGetAccount";
import { AccountListColumns } from "@/components/tableComponent/columns/AccountListColumns";
import { ReusableDataTable } from "@/components/tableComponent/ReusableDataTable";
import { AccountToolbar } from "@/components/tableComponent/toolbar/AccountToolbar";

function AccountPage() {
  const query = useGetAccount();

  return (
    <div>
      <ReusableDataTable
        query={query || []}
        columns={AccountListColumns}
        mobileVisibility={{ lessonName: false, remainingTime: false }}
        desktopVisibility={{ lessonName: true, remainingTime: true }}
      >
        {(table) => <AccountToolbar table={table} />}
      </ReusableDataTable>
    </div>
  );
}
export default AccountPage;
