package pl.edu.ug.inf.lexica.service;

import java.util.*;

public interface EntityService<T> {
    void add(T entity);
    void addAll(List<T> entities);
    void remove(Long id);
    List<T> getAll();
    Optional<T> get(Long id);
    void update(T entity);
}
