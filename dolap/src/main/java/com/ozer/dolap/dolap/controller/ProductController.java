package com.ozer.dolap.dolap.controller;

import com.ozer.dolap.dolap.entity.Product;
import com.ozer.dolap.dolap.inputs.AddProductInput;
import com.ozer.dolap.dolap.inputs.UpdateProductInput;
import com.ozer.dolap.dolap.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Product getById(@PathVariable(value = "id") int id) {
        return productService.getProductById(id);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public void updateProduct(@PathVariable(value = "id") int id, @RequestBody UpdateProductInput input) {
        productService.updateProduct(id, input.getName(), input.getPrice(), input.getCategory_id());
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable(value = "id") int id) {
        productService.deleteProductById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addProduct(@RequestBody AddProductInput input) {
        productService.insertProduct(input.getName(), input.getPrice(), input.getCategory_id());
    }
}
