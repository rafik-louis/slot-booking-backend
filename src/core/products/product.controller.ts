import {Controller} from "../controller";
import {Product} from "../products/product.model";
import {ProductRepository} from "../products/product.repository";
import { Request, Response } from "express";
import * as products from '../../../system-config/products.json';

export class ProductsController extends Controller<Product> {
    private productRepository: ProductRepository;

    public constructor() {
        super();
        this.productRepository = new ProductRepository();
        this.setRepository(this.productRepository);
        this.setRelations(['bookedSlots']);
        this.setName('product');
    }

    public async createProducts(request: Request, response: Response) {
        try {
            for (let product of products) {
                await this.productRepository.save(product);
            }
            response.status(201).send('success');
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
    }

    public async get(request: Request, response: Response) {
        try {
            let slots = await this.productRepository.getQueryBuilder()
                .where('archived = false')
                .getMany();
            response.status(200).send(slots);
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
    }
}