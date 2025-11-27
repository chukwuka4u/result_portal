import { authHandler } from "../../users/auth-handler"

describe("GET /api/users/login", () => {
  it("should get blessing, authenticating", async () => {
    const credentials = {
      email: "blessing@gmail.com",
      password: "password123"
    }
    const res = await authHandler(credentials)
    console.log(res)
    expect(res).not.toBe(null);
  }, 10000);
});
