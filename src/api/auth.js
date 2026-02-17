import { http } from "./http";

export async function loginApi({ email, password }) {
  const { data } = await http.get(`/users?email=${encodeURIComponent(email)}`);
  const user = data?.[0];
  if (!user) throw new Error("User tidak ditemukan.");
  if (String(user.password) !== String(password)) throw new Error("Email/password salah.");

  return {
    token: `mock-${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      customerId: user.customerId,
    },
  };
}
