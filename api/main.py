from typing import Union
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from . import models, schemas
from .database import SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

routes = "/api/v1"
# CRUD operations for Invoice model
@app.post(routes+"/invoice", response_model=schemas.Invoice)
async def create_invoice(invoice: schemas.InvoiceClaimBase, db: Session = Depends(get_db)):
    try:
        db_invoice = models.Invoice(**invoice.dict())
        db.add(db_invoice)
        db.commit()
        db.refresh(db_invoice)
        return db_invoice
    except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))


@app.get(routes+"/invoice", response_model=list[schemas.Invoice])
async def get_invoice(db: Session = Depends(get_db)):
    invoice = db.query(models.Invoice).all()
    return invoice

@app.get(routes+"/invoice/{id}", response_model=schemas.Invoice)
async def read_invoice(id: int, db: Session = Depends(get_db)):
    invoice = db.query(models.Invoice).filter(models.Invoice.id == id).first()
    if invoice is None:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@app.delete(routes+"/invoice/{id}")
async def delete_invoice(id: int, db: Session = Depends(get_db)):
    try:
        invoice = db.query(models.Invoice).filter(models.Invoice.id == id).first()
        db.delete(invoice)
        db.commit()
        return {"detail": "Invoice deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="No invoice data selected")

@app.patch(routes+"/invoice/claim/{id}", response_model=schemas.Invoice)
async def update_invoice_list(id: int, invoice_list: schemas.InvoiceClaimBase, db: Session = Depends(get_db)):
    try:
        invoice = db.query(models.Invoice).filter(models.Invoice.id == id).first()
        for key, value in invoice_list.dict().items():
             setattr(invoice, key, value)
        db.commit()
        return invoice
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.patch(routes+"/invoice/list/{id}", response_model=schemas.Invoice)
async def update_invoice_list(id: int, invoice_list: schemas.InvoiceListBase, db: Session = Depends(get_db)):
    try:
        invoice = db.query(models.Invoice).filter(models.Invoice.id == id).first()
        for key, value in invoice_list.dict().items():
             setattr(invoice, key, value)
        db.commit()
        return invoice
    except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

@app.post(routes+"/invoice/list/detail", response_model=schemas.InvoiceListDetail)
async def create_invoice_list_detail(invoice_list_detail: schemas.InvoiceListDetailCreate, db: Session = Depends(get_db)):
    db_invoice_list = models.InvoiceListDetail(**invoice_list_detail.dict())
    db.add(db_invoice_list)
    db.commit()
    db.refresh(db_invoice_list)
    return db_invoice_list

@app.delete(routes+"/invoice/list/detail/{id}")
async def delete_invoice(id: int, db: Session = Depends(get_db)):
    try:
        invoice = db.query(models.InvoiceListDetail).filter(models.InvoiceListDetail.id == id).first()
        db.delete(invoice)
        db.commit()
        return {"detail": "Invoice detail deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="No invoice detail data selected")
