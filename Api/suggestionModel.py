# FastAPI version of your model

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from typing import List, Dict, Optional
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim
import json
import torch
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

import tensorflow as tf


app = FastAPI()

# Allow CORS for frontend use
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
# kw_model = KeyBERT('all-MiniLM-L6-v2')
# model = SentenceTransformer('all-MiniLM-L6-v2')
df = pd.DataFrame()

@app.on_event("startup")
async def load_models():
    global model, kw_model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    kw_model = KeyBERT(model)

DF_PATH = "data/verses_df.pkl"

def load_df():
    if os.path.exists(DF_PATH):
        return pd.read_pickle(DF_PATH)
    return pd.DataFrame()

def save_df(df):
    os.makedirs(os.path.dirname(DF_PATH), exist_ok=True)
    df.to_pickle(DF_PATH)

# ----------- Utility Functions -----------
def extract_keywords(text, top_n=5):
    keywords = kw_model.extract_keywords(text, top_n=top_n)
    return [kw for kw, score in keywords if score > 0.4]

def embed_text(text):
    return model.encode(text)

# ----------- Endpoint 1: Train from JSON in request body -----------
class TrainRequest(BaseModel):
    verses: List[Dict]

@app.post("/train")
def train_from_json(req: TrainRequest):
    print("training start")
    global df
    try:
        df = pd.DataFrame(req.verses)
        print(df.head(5))
        if "english_translation" not in df.columns:
            raise HTTPException(status_code=400, detail="Missing 'english_translation' column")
        print("english_translation_present")
        df["keywords"] = df["english_translation"].apply(lambda x: extract_keywords(x))
        df["embedding"] = df["english_translation"].apply(lambda x: embed_text(x).tolist())
        save_df(df)
        print("save complete")
        return {"status": "training complete", "keyword_sample": df["keywords"].tolist()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- Endpoint 2: Predict from keywords -----------
class PredictionRequest(BaseModel):
    chapter_id: Optional[List[int]] = None
    keywords: List[str]
import numpy as np  # make sure this is imported

@app.post("/predict")
def predict_verses(req: PredictionRequest):
    print("start predicting")
    df = load_df()
    print("load done")
    print(df.head())
    
    if df.empty:
        raise HTTPException(status_code=400, detail="Model not trained yet. Please upload JSON first.")
    
    print("df exist")
    query = " ".join(req.keywords)
    query_embedding = torch.tensor(embed_text(query), dtype=torch.float32)
    print("query embedding ready")

    if req.chapter_id:
        filtered_df = df[df["chapter_id"].isin(req.chapter_id)].copy()
    else:
        filtered_df = df.copy()

    print("filtered query")

    filtered_df["similarity"] = filtered_df["embedding"].apply(
        lambda x: cos_sim(query_embedding, torch.tensor(x, dtype=torch.float32)).item()
    )

    results = filtered_df[filtered_df["similarity"] > 0.1]
    results = results.sort_values(by="similarity", ascending=False)

    # ✅ Replace NaN with None for JSON compatibility
    results = results.replace({np.nan: None})

    return results[[
        "chapter_id", "_id", "verse_no", "hindi_translation", "sanskrit_script","interpretation",
        "who_tell", "whome_to_tell", "video", "audio", "english_translation",
        "similarity", "keywords"
    ]].to_dict(orient="records")
