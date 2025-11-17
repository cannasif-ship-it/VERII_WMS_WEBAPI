export interface OnHandQuantityDto {
  DepoKodu: number;
  StokKodu?: string;
  ProjeKodu?: string;
  SeriNo?: string;
  HucreKodu?: string;
  Kaynak?: string;
  Bakiye?: number;
  StokAdi?: string;
  DepoIsmi?: string;
}

export interface CariDto {
  SubeKodu: number;
  IsletmeKodu: number;
  CariKod: string;
  CariTel?: string;
  CariIl?: string;
  UlkeKodu?: string;
  CariIsim?: string;
  CariTip?: char;
  GrupKodu?: string;
  RaporKodu1?: string;
  RaporKodu2?: string;
  RaporKodu3?: string;
  RaporKodu4?: string;
  RaporKodu5?: string;
  CariAdres?: string;
  CariIlce?: string;
  VergiDairesi?: string;
  VergiNumarasi?: string;
  Fax?: string;
  PostaKodu?: string;
  DetayKodu?: number;
  NakliyeKatsayisi?: number;
  RiskSiniri?: number;
  Teminati?: number;
  CariRisk?: number;
  CcRisk?: number;
  SaRisk?: number;
  ScRisk?: number;
  CmBorct?: number;
  CmAlact?: number;
  CmRapTarih?: string;
  KosulKodu?: string;
  IskontoOrani?: number;
  VadeGunu?: number;
  ListeFiati?: number;
  Acik1?: string;
  Acik2?: string;
  Acik3?: string;
  MKod?: string;
  DovizTipi?: number;
  DovizTuru?: number;
  HesapTutmaSekli?: char;
  DovizLimi?: char;
}

export interface StokDto {
  SubeKodu: number;
  IsletmeKodu: number;
  StokKodu: string;
  UreticiKodu: string;
  StokAdi: string;
  GrupKodu: string;
  SaticiKodu: string;
  OlcuBr1: string;
  OlcuBr2: string;
  Pay1: number;
  Kod1: string;
  Kod2: string;
  Kod3: string;
  Kod4: string;
  Kod5: string;
}

export interface DepoDto {
  DepoKodu: number;
  DepoIsmi: string;
}

export interface ProjeDto {
  ProjeKod: string;
  ProjeAciklama: string;
}

export interface OpenGoodsForOrderByCustomerDto {
  FatirsNo: string;
  Tarih: string;
  BrutTutar?: number;
}

export interface OpenGoodsForOrderDetailDto {
  StokKodu: string;
  KalanMiktar?: number;
  DepoKodu?: number;
  DepoIsmi?: string;
  StokAdi?: string;
  GirisSeri: string;
  SeriMik: string;
}

export interface ErpPagedRequest {
  Page: number;
  PageSize: number;
  SearchTerm?: string;
  SortBy?: string;
  SortDescending: boolean;
}

