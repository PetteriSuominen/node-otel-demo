console.log("Starting Products API...");
import express from "express";
import { getPool } from "./database.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

type Product = {
  Id: string;
  Name: string;
  Price: number;
};

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching product with id: ${id}`);
  const pool = await getPool();

  console.log(`Executing query for product with id: ${id}`);
  const request = pool.request();
  request.input("id", id);

  console.log(`Executing stored procedure for product with id: ${id}`);
  const result = await request.execute<Product>("ProductsDb.dbo.get_products");

  // const result = await pool
  //   .request()
  //   .input("id", id)
  //   .query<Product>("SELECT * FROM Products WHERE Id = @id");

  console.log(
    `Query executed for product with id: ${id}, result:`,
    result.recordset,
  );
  const product = result.recordset[0];

  if (!product) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }

  console.log(`Returning product with id: ${id}`, product);

  res.status(200).json({
    id: product.Id,
    name: product.Name,
    price: product.Price,
  });
  console.log("done");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Products API listening on port ${port}`);
});
