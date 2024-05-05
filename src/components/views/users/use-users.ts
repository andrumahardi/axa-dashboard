import { useGetUsers } from "./queries";

export function useUsers({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  const {
    data,
    isLoading,
    error: getUserError,
  } = useGetUsers({ page, pageSize });

  return {
    contents: data?.data || [],
    isLoading,
    getUserError,
  };
}
