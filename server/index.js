import express from "express"
import cors from "cors"
import controller from "./controller.js"

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-in", controller.signIn);
app.post("/sign-up", controller.signUp);
app.get("/verify-token", controller.verifyToken)
app.get("/cases", controller.getCases)
app.get("/cases-json", controller.getCasesJSON)
app.get("/graphics-cards", controller.getGraphicsCards)
app.get("/graphics-cards-json", controller.getGraphicsCardsJSON)
app.get("/memory", controller.getMemory)
app.get("/memory-json", controller.getMemoryJSON)
app.get("/motherboards", controller.getMotherboards)
app.get("/motherboards-json", controller.getMotherboardsJSON)
app.get("/power-supplies", controller.getPowerSupplies)
app.get("/power-supplies-json", controller.getPowerSuppliesJSON)
app.get("/processors", controller.getProcessors)
app.get("/processors-json", controller.getProcessorsJSON)
app.get("/storage", controller.getStorage)
app.get("/storage-json", controller.getStorageJSON)


app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
