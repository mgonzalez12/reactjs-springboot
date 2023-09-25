package com.mdcreativo.backendcardapp.repositories;

import com.mdcreativo.backendcardapp.models.entities.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product,Long> {
}
