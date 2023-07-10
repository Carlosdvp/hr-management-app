import app from "./app";

const port: number = parseInt(process.env.PORT as string) || 3333;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
