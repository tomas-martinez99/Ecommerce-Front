import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userServices/user.service";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const users = await userService.getAll();
      // 🔹 Filtramos por roleId que represente empleados
      return users.filter(u => u.roleId === 2); 
    },
  });
}