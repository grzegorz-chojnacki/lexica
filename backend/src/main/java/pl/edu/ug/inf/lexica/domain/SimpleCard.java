package pl.edu.ug.inf.lexica.domain;

import lombok.Data;

@Data
public class SimpleCard extends Identifiable{

    private String name;
    private String taskType;
    private String description;
    private boolean isActive;

    private String nativeWord;
    private String foreignWord;


}
