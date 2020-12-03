package pl.edu.ug.inf.lexica.service;

import pl.edu.ug.inf.lexica.domain.Identifiable;

import java.util.*;

public abstract class EntityService<T extends Identifiable<T>> {
    Base64.Encoder encoder = Base64.getEncoder();
    List<T> entities = new ArrayList<>();

    public void add(T entity) {
        entity.setId(getNewId());
        entities.add(entity);
    }

    public void remove(String id) {
        get(id).ifPresent(entity -> entities.remove(entity));
    }

    private String getNewId() {
        return encoder.encodeToString(UUID.randomUUID().toString().getBytes());
    }

    public List<T> getAll(){
        return entities;
    }

    public Optional<T> get(String id){
        return entities.stream().filter(entity -> entity.getId().equals(id)).findFirst();
    }

    public T replace(String id, T newEntity) {
        return get(id)
                .map(originalEntity -> originalEntity.patch(newEntity))
                .orElse(null);
    }


}
