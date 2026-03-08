from fastapi import FastAPI
from pydantic import BaseModel
import torch
from torchvision import models, transforms
from PIL import Image
import os

app = FastAPI()

class ImageRequest(BaseModel):
    image_path: str

# Load ResNet model for AI vs Real classification
model = models.resnet18(pretrained=True)
model.fc = torch.nn.Linear(model.fc.in_features, 2)

# Load trained weights if available
weights_path = "ai_vs_real.pth"
if os.path.exists(weights_path):
    model.load_state_dict(torch.load(weights_path, map_location="cpu"))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(req: ImageRequest):
    if not os.path.exists(req.image_path):
        return {"result": "Unknown", "error": "Image not found"}

    try:
        image = Image.open(req.image_path).convert("RGB")
        tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            output = model(tensor)
            _, predicted = torch.max(output, 1)

        result = "AI-generated" if predicted.item() == 0 else "Real"
        return {"result": result}

    except Exception as e:
        return {"result": "Unknown", "error": str(e)}
