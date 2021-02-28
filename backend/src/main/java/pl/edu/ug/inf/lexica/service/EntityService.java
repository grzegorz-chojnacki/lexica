package pl.edu.ug.inf.lexica.service;

import java.util.*;

public interface EntityService<T> {
    Optional<T> add(T entity);
    void addAll(List<T> entities);
    void remove(UUID id);
    Optional<T> get(UUID id);
    void update(T entity);
}
