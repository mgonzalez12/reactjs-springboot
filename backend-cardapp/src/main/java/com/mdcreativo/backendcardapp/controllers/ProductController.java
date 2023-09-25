package com.mdcreativo.backendcardapp.controllers;

import com.mdcreativo.backendcardapp.models.entities.Product;
import com.mdcreativo.backendcardapp.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public List<Product>  list() {
        return service.findAll();
    }
}
