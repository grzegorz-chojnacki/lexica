package pl.edu.ug.inf.lexica.domain;

public interface Patchable<T> {
    T patch(T that);
}
