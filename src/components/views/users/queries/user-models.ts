import { AxiosResponse } from "axios";

export type UserListResponse = Array<{
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
}>;

export type UsersModel = ReturnType<typeof usersModel>;
export function usersModel({ data }: AxiosResponse<UserListResponse>) {
  return data.map((item) => ({
    id: item.id,
    name: item.name || "-",
    username: item.username || "-",
    email: item.email || "-",
    address: {
      street: item.address?.city || "-",
      suite: item.address?.suite || "-",
      city: item.address?.city || "-",
      zipcode: item.address?.zipcode || "-",
      geo: {
        lat: item.address?.geo?.lat || "-",
        lng: item.address?.geo?.lng || "-",
      },
    },
    phone: item.phone || "-",
  }));
}
