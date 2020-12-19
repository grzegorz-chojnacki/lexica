package pl.edu.ug.inf.lexica.service;

import java.util.*;

public interface EntityService<T> {
    void add(T entity);
    void addAll(List<T> entities);
    void remove(String id);
    List<T> getAll();
    Optional<T> get(String id);
    T replace(String id, T newEntity);
}
