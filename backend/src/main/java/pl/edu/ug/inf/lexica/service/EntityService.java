package pl.edu.ug.inf.lexica.service;

import java.util.*;

public interface EntityService<T> {
    void add(T entity);
    void addAll(List<T> entities);
    void remove(Integer id);
    List<T> getAll();
    Optional<T> get(Integer id);
    T replace(Integer id, T newEntity);
}
