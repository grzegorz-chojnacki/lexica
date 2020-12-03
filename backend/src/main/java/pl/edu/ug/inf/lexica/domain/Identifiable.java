package pl.edu.ug.inf.lexica.domain;

import lombok.Data;

@Data
public abstract class Identifiable<T> {
    protected String id;

    public abstract T patch(T t);
}
