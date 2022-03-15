export class componentDTO {
  private _componetName: string;
  private _componetDesc: string;
  private _imageURL : string;
  private _qty: string;
  private _unitPrice: string;
  private _componetCode: string;

  constructor(componetName: string, componetDesc: string, imageURL: string, qty: string, unitPrice: string, componetCode: string) {
    this._componetName = componetName;
    this._componetDesc = componetDesc;
    this._imageURL = imageURL;
    this._qty = qty;
    this._unitPrice = unitPrice;
    this._componetCode = componetCode;
  }

  get componetName(): string {
    return this._componetName;
  }

  set componetName(value: string) {
    this._componetName = value;
  }

  get componetDesc(): string {
    return this._componetDesc;
  }

  set componetDesc(value: string) {
    this._componetDesc = value;
  }

  get imageURL(): string {
    return this._imageURL;
  }

  set imageURL(value: string) {
    this._imageURL = value;
  }

  get qty(): string {
    return this._qty;
  }

  set qty(value: string) {
    this._qty = value;
  }

  get unitPrice(): string {
    return this._unitPrice;
  }

  set unitPrice(value: string) {
    this._unitPrice = value;
  }

  get componetCode(): string {
    return this._componetCode;
  }

  set componetCode(value: string) {
    this._componetCode = value;
  }
}
