import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { updatUser, user } from "../types/userInterfaces";
import { generateToken } from "../services/tokenGenerator";
import {
  validateLoginUser,
  validateRegisterUser,
  validateUpdateuser,
  validateuserId,
} from "../validators/userValidator";
import { comparePass, hashPass } from "../services/passwordHash";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const procedureName = "getUsers";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const club_id = req.params.club_id;
    // console.log(club_id);
    if (!club_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateuserId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "getUserById";
    const result = await execute(procedureName, { club_id });

    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { user_name, password, email,cohort_number } = req.body;

    // console.log(req.body);

    const { error } = validateRegisterUser.validate(req.body);
    // console.log(error);
    

    if (error)
      return res.status(400).json({
        error:
          "check email or password ! password should be atleast 8 characters long with letters symbols and uppercase , email should be firstname.lastname@thejitu.com",
      });

    const procedure1 = "getUserByEmail";
    const result = await execute(procedure1, { email });

    const userWithEmail =
      result.recordset && result.recordset.length > 0
        ? result.recordset[0]
        : undefined;

    if (userWithEmail) {
      return res
        .status(404)
        .json({ error: "Account exists with the given email" });
    }

    const newPassword = await hashPass(password);
    // console.log(userWithEmail);

    const newUser: user = {
      club_id: uuidv4(),
      user_name,
      email,
      password: newPassword,
      cohort_number,
    };

    const procedureName = "registerUser";
    const params = newUser;
    // console.log(params);

    await execute(procedureName, params);

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const procedureName = "getUserByEmail";

    const { error } = validateLoginUser.validate(req.body);

    if (error)
      return res.status(400).json({
        error: "please check if entered password and email are correct",
      });

    const result = await execute(procedureName, { email });
    if (result) {
      const recordset = result.recordset;
      const user = recordset[0];

      if (!user) {
        return res.status(404).json({ error: "Account does not exist" });
      }

      const validPassword = await comparePass(password, user.password);

      if (!validPassword) {
        return res.status(404).json({ error: "Invalid password" });
      }

      const token = generateToken(
        user.email,
        user._id,
        user.fullName,
        user.isAdmin
      );
      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(404).json({ message: "Account does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { club_id, user_name, email,cohort_number } = req.body;

    const { error } = validateUpdateuser.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ error: "check full name & email if they are correct" });

    const newUser: updatUser = {
      club_id,
      user_name,
      email,
      cohort_number,
    };

    const procedureName = "updateUser";
    const params = newUser;
    // console.log(params);

    await execute(procedureName, params);
    return res.send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const club_id = req.params.club_id;
    // console.log(id);
    if (!club_id) return res.status(400).send({ error: "Id is required" });

    const { error } = validateuserId.validate(req.params);

    if (error) return res.status(400).send({ error: "Id is required" });

    const procedureName = "deleteUser";
    await execute(procedureName, { club_id });

    res.status(201).send({ message: "User deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
