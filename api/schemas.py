from pydantic import BaseModel
from typing import Optional
from datetime import date

class InvoiceListDetailBase(BaseModel):
    po_no: str
    items: str
    quantity: int
    amount_dpp: float
    other_amount: float
    ppn_amount: float
    pph_prepaid: float
    pph_payable: float
    total_before_tax: float
    total_after_tax: float

class InvoiceListDetailCreate(InvoiceListDetailBase):
    invoice_id: int

class InvoiceListDetail(InvoiceListDetailBase):
    id: int
    invoice_id: int

    class Config:
        orm_mode = True

class InvoiceClaimBase(BaseModel):
    bds_doc_no: str
    bds_doc_date: date
    supplier: str
    supplier_tax_id: str
    transaction_type: str = 'other'
    bank_name: str
    bank_account: int
    bank_account_name: str
    support_doc: str
    payment_plan_date: date
    paid_date: date

class InvoiceListBase(BaseModel):
    top: Optional[int] = None
    invoice_due_date: Optional[date] = None
    tax_invoice_id: Optional[str] = None
    ppn_rate: Optional[float] = None
    description: Optional[str] = None
    total_before_tax: Optional[float] = None
    ppn_prepaid: Optional[float] = None
    total_after_tax: Optional[float] = None

class InvoiceBase(InvoiceClaimBase, InvoiceListBase):
    pass

class Invoice(InvoiceBase):
    id: int
    invoice_list_detail: list[InvoiceListDetail] = []

    class Config:
        orm_mode = True
