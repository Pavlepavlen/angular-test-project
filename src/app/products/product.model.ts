interface IProduct {

            in_potential_products: boolean;
            asin: string;
            price: number;
            weight: number;
            updated_at: number;
            name: string;
            shipping_weight: number;
            domain: string;
            votes_count: number;
            daily_cashflow: number;
            currency: string;
            img: string;
            daily_sales: number;
            stars: number;
            bsr_value: number;
            brand_class: string;
            size: Array<any>;
            link: string;
            bsr_category: string;
            brand: string;
}

export class Product {
    public inPotentialProducts: boolean;
    public asin: string;
    public price: number;
    public weight: number;
    public updatedAt: number;
    public name: string;
    public shippingWeight: number;
    public domain: string;
    public votesCount: number;
    public dailyCashflow: number;
    public currency: string;
    public img: string;
    public dailySales: number;
    public stars: number;
    public bsrValue: number;
    public brandClass: string;
    public size: Array<any>;
    public link: string;
    public bsrCategory: string;
    public brand: string;

    constructor(obj: IProduct) {

    this.inPotentialProducts = obj.in_potential_products;
    this.asin = obj.asin;
    this.price = obj.price;
    this.weight = obj.weight;
    this.updatedAt = obj.updated_at;
    this.name = 'hello';
    this.shippingWeight = obj.shipping_weight;
    this.domain = obj.domain;
    this.votesCount = obj.votes_count;
    this.dailyCashflow = obj.daily_cashflow;
    this.currency = obj.currency;
    this.img = obj.img.split('\\').join('');
    this.dailySales = obj.daily_sales;
    this.stars = obj.stars;
    this.bsrValue = obj.bsr_value;
    this.brandClass = obj.brand_class;
    this.size = obj.size;
    this.link = obj.link;
    this.bsrCategory = obj.bsr_category;
    this.brand = obj.brand;

    }


}

