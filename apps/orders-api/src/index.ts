import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

const productsApiURL = process.env.PRODUCTS_API_URL ?? "http://localhost:3001";

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productResponse = await fetch(`${productsApiURL}/products/${id}`);

    if (!productResponse.ok) {
      console.error("Error fetching product:", productResponse.statusText);
      return res.status(500).json({
        error: "Could not fetch product information",
      });
    }

    const product = await productResponse.json();

    res.status(200).json({
      id,
      quantity: Math.floor(Math.random() * 10) + 1,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(502).json({
      error: "Could not fetch product information",
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Orders API listening on port ${port}`);
});
