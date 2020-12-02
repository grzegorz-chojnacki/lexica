package pl.edu.ug.inf.lexica.service;

import pl.edu.ug.inf.lexica.domain.Identifiable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public abstract class EntityService<T extends Identifiable> {

    List<T> entities = new ArrayList<>();

    public void add(T entity){
        entities.add(entity);
    }

    public List<T> getAll(){
        return entities;
    }
    Optional<T> get(String id){
        return entities.stream().filter(entity -> entity.getId().equals(id)).findFirst();
    }

}
