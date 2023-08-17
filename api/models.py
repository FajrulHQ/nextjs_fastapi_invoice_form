from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship

from .database import Base

class Invoice(Base):
    __tablename__="invoice"

    id                  = Column(Integer, primary_key=True, index=True)
    bds_doc_no          = Column(String)
    bds_doc_date        = Column(Date)
    supplier            = Column(String)
    supplier_tax_id     = Column(String)
    transaction_type    = Column(String, default='other')
    bank_name           = Column(String)
    bank_account        = Column(Integer)
    bank_account_name   = Column(String)
    support_doc         = Column(String)
    payment_plan_date   = Column(Date)
    paid_date           = Column(Date)

    # invoice list    
    top                 = Column(Integer)
    invoice_due_date    = Column(Date)
    tax_invoice_id      = Column(String)
    ppn_rate            = Column(Float)
    description         = Column(String)
    total_before_tax    = Column(Float)
    ppn_prepaid         = Column(Float)
    total_after_tax     = Column(Float)

    invoice_list_detail = relationship("InvoiceListDetail", back_populates="invoice", cascade="all, delete")

class InvoiceListDetail(Base):
    __tablename__="invoice_list_detail"

    id                  = Column(Integer, primary_key=True, index=True)
    po_no               = Column(String)
    items               = Column(String)
    quantity            = Column(Integer)
    amount_dpp          = Column(Float)
    other_amount        = Column(Float)
    ppn_amount          = Column(Float)
    pph_prepaid         = Column(Float)
    pph_payable         = Column(Float)
    total_before_tax    = Column(Float)
    total_after_tax     = Column(Float)

    invoice_id          = Column(Integer, ForeignKey("invoice.id", ondelete="CASCADE"))
    
    invoice        = relationship("Invoice", back_populates="invoice_list_detail")
