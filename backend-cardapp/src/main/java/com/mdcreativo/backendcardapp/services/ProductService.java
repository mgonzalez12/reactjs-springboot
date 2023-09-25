package com.mdcreativo.backendcardapp.services;

import com.mdcreativo.backendcardapp.models.entities.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
}
