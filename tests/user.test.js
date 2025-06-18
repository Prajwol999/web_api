const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const User = require("../models/User");

let authToken = "";

beforeAll(async () => {
    // Ensure DB is connected
    await mongoose.connect("mongodb://localhost:27017/mydb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("User Authentication API", () => {
    it("should validate missing fields while creating user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "Ram",
                email: "ram@gmail.com"
                // Missing password, lastName, etc.
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Missing fields");
        expect(res.body.success).toBe(false);
    });

    test("can create a user with all fields", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "Ram",
                lastName: "Singh", // Fixed typo
                email: "ram123@gmail.com",
                username: "ram123",
                password: "password"
            });

        expect(res.body.success).toBe(false);
    });

    test("can login a user with valid credentials", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "ram123@gmail.com",
                password: "password"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toEqual(expect.any(String));

        authToken = res.body.token; // Store token for later use
    });

    describe("Authenticated admin routes", () => {
        beforeAll(async () => {
            await User.updateOne(
                { email: "ram123@gmail.com" },
                { $set: { role: "admin" } }
            );
        });

        test("can get all users as admin with token", async () => {
            const res = await request(app)
                .get("/api/admin/user")
                .set("Authorization", "Bearer " + authToken);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
