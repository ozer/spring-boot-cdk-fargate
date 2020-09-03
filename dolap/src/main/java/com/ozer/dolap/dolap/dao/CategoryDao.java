package com.ozer.dolap.dolap.dao;

import com.ozer.dolap.dolap.entity.Category;

import java.util.Collection;
import java.util.Optional;

public interface CategoryDao {
    Collection<Category> getAllCategories();
    Category getCategoryById(int id);
    void addCategory(String name);
    void updateCategoryName(int id, String name);
}
