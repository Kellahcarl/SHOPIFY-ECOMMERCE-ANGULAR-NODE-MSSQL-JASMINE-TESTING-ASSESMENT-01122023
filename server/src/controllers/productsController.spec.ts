import { Request, Response } from "express";

import { execute, query } from "../services/dbconnect";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./productsController";

jest.mock("../services/dbconnect.ts", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("Products controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates a new product successfully", async () => {
    // Mock the execute function
    (execute as jest.Mock).mockResolvedValueOnce({});

    const req = {
      body: {
        title: "Test Product",
        price: 20.99,
        image: "test-image-url",
        description: "Test description",
        stock: 10,
      },
    } as any;

    const res = {
      send: jest.fn(),
    } as any;

    await createProduct(req, res);

    expect(execute).toHaveBeenCalledWith("createProduct", expect.any(Object));
    expect(res.send).toHaveBeenCalledWith({
      message: "product created successfully",
    });
  });
  test("handles validation error", async () => {
    const req = {
      body: {
        // Missing required fields
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "please place correct details",
    });
  });

  test("handles internal server error during product creation", async () => {
    (execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const req = {
      body: {
        title: "Test Product",
        price: 20.99,
        image: "test-image-url",
        description: "Test description",
        stock: 10,
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await createProduct(req, res);

    expect(execute).toHaveBeenCalledWith("createProduct", expect.any(Object));
    //   expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Database error");
  });

  test("gets all products successfully", async () => {
    const mockProducts = [
      {
        product_id: "123",
        title: "john@example.com",
        description: "hashedPassword",
        price: 100,
        image: "test-image-url",
        stock: 10,
      },
      {
        product_id: "123",
        title: "john@example.com",
        description: "hashedPassword",
        price: 100,
        image: "test-image-url",
        stock: 10,
      },
    ];
    (query as jest.Mock).mockResolvedValueOnce({ recordset: mockProducts });

    const req = {} as Request;

    const res = {
      json: jest.fn(),
    } as any;

    await getProducts(req, res);

    expect(query).toHaveBeenCalledWith("EXEC getProducts");
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });
  test("handles internal server error during products retrieval", async () => {
    (query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await getProducts(req, res);

    expect(query).toHaveBeenCalledWith("EXEC getProducts");
    // expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "internal server error",
    });
  });
//   test("updates a product successfully", async () => {
//     (execute as jest.Mock).mockResolvedValueOnce({});

//     const req = {
//       body: {
//         product_id: "test-id",
//         title: "Updated Product",
//         price: 25.99,
//         image: "updated-image-url",
//         description: "Updated description",
//         stock: 15,
//       },
//     } as any;

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as any;

//     await updateProduct(req, res);

//     expect(execute).toHaveBeenCalledWith("updateProduct", {
//       product_id: "test-id",
//       title: "Updated Product",
//       price: 25.99,
//       image: "updated-image-url",
//       description: "Updated description",
//       stock: 15,
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.send).toHaveBeenCalledWith({
//       message: "Product updated successfully",
//     });
//   });
//   test("handles internal server error during product update", async () => {
//     (execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

//     const req = {
//       body: {
//         product_id: "test-id",
//         title: "Updated Product",
//         price: 25.99,
//         image: "updated-image-url",
//         description: "Updated description",
//         stock: 15,
//       },
//     } as Request;

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as any;

//     await updateProduct(req, res);

//     expect(execute).toHaveBeenCalledWith("updateProduct", expect.any(Object));
//     //   expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith("Internal Server Error");
//   });

//   test("deletes a product successfully", async () => {
//     (execute as jest.Mock).mockResolvedValueOnce({});

//     const req = {
//       params: {
//         product_id: "test-id",
//       },
//     } as any;

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as any;

//     await deleteProduct(req, res);

//     expect(execute).toHaveBeenCalledWith("deleteProduct", {
//       product_id: "test-id",
//     });
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.send).toHaveBeenCalledWith({
//       message: "product deleted Successfully",
//     });
//   });
//   test("handles internal server error during product deletion", async () => {
//     (execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

//     const req = {
//       params: {
//         product_id: "test-id",
//       },
//     } as any;

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as any;

//     await deleteProduct(req, res);

//     expect(execute).toHaveBeenCalledWith("deleteProduct", {
//       product_id: "test-id",
//     });
//     // expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith("Internal Server Error");
//   });
//   test("gets a product successfully", async () => {
//     const mockProduct = [
//       {
//         recordset: [
//           {
//             product_id: "123",
//             title: "john@example.com",
//             description: "hashedPassword",
//             price: 100,
//             image: "test-image-url",
//             stock: 10,
//           },
//         ],
//       },
//     ];
//     (execute as jest.Mock).mockResolvedValueOnce({
//       recordset: mockProduct,
//     });

//     const req = {
//       params: {
//         product_id: "test-id",
//       },
//     } as any;

//     const res = {
//       json: jest.fn(),
//     } as any;

//     await getProduct(req, res);

//     expect(execute).toHaveBeenCalledWith("getProductById", {
//       product_id: "test-id",
//     });
//     expect(res.json).toHaveBeenCalledWith([
//       {
//         recordset: mockProduct[0].recordset,
//       },
//     ]);
//   });
//   test("handles internal server error during product retrieval", async () => {
//     (execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

//     const req = {
//       params: {
//         product_id: "test-id",
//       },
//     } as any;

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as any;

//     await getProduct(req, res);

//     expect(execute).toHaveBeenCalledWith("getProductById", {
//       product_id: "test-id",
//     });
//     // expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith("Internal Server Error");
//   });
});
