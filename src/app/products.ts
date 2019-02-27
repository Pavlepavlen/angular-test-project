export interface IProducts {
        count_products: number;
        page_count: number;
        products: [
            {
                in_potential_products: boolean,
                asin: string,
                price: number,
                weight: number,
                updated_at: number,
                name: string,
                shipping_weight: number,
                domain: string,
                votes_count: number,
                daily_cashflow: number,
                currency: string,
                img: string,
                daily_sales: number,
                stars: number,
                bsr_value: number,
                brand_class: string,
                size: Array<any>,
                link: string,
                bsr_category: string,
                brand: string
            }
        ];
        page: number;
}
