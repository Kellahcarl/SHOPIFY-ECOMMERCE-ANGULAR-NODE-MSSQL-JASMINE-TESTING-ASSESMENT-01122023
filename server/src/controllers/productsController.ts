import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";
import { Product } from "../types/productInterface";
import {
  validateProduct,
  validateProductId,
  validateUpdateProduct,
} from "../validators/productValidator";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, image, description, stock } = req.body;

    // console.log(req.body);

    const { error } = validateProduct.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newProduct: Product = {
      product_id: uuidv4(),
      title,
      price,
      image,

      description,
      stock,
    };

    const procedure = "createProduct";
    const params = newProduct;

    await execute(procedure, params);
    return res.send({ message: "product created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { product_id, title, price, image,  description, stock } =
      req.body;
    // console.log(req.body);

    const { error } = validateUpdateProduct.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Product = {
      product_id,
      title,
      price,
      image,
      
      description,
      stock,
    };

    const ProcedureName = "updateProduct";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product_id = req.params.product_id;
    if (!product_id) return res.status(400).send({ error: "Id is required" });

    const { error } = validateProductId.validate(req.params);

    if (error) return res.status(400).send({ error: "please input id" });

    const procedureName = "deleteProduct";
    await execute(procedureName, { product_id });

    res.status(201).send({ message: "product deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product_id = req.params.product_id;
    // console.log(product_id);
    if (!product_id) return res.status(400).send({ error: "Id is required" });

    const { error } = validateProductId.validate(req.params);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const procedureName = "getProductById";
    const result = await execute(procedureName, { product_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const procedureName = "getProducts";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
