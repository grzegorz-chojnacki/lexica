package pl.edu.ug.inf.lexica.domain;

import lombok.Data;

@Data
public class Progress extends Identifiable{

    private String taskId;
    private String userId;
    private int completed;
}
